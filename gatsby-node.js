const path = require(`path`)
const chunk = require(`lodash/chunk`);

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities);
  const pages = await getPages(gatsbyUtilities);
  const pagesElementor = await getElementorPages(pages, gatsbyUtilities);

  // If there are no posts in WordPress, don't do anything

  if (posts.length > 0) {
    await createIndividualBlogPostPages({ posts, gatsbyUtilities });
    await createBlogPostArchive({ posts, gatsbyUtilities });
  }

  if(pagesElementor.length > 0) {
    await createIndividualPages({pagesElementor, gatsbyUtilities});
  }
}

function getElementorPages(pages, gatsbyUtilities) {
  return Promise.all(pages.map( async item => {
    if(item.elementorContent.length > 0) item.elementorContent = await transformNode(JSON.parse(item.elementorContent), gatsbyUtilities);
    else item.elementorContent = [];
    return item;
  })).then(
    data => data
  )
  .catch(err => {
    console.log(err);
    return []
  })
}

const createIndividualPages = ({ pagesElementor, gatsbyUtilities }) =>
  Promise.all(
    pagesElementor.map(({ uri, elementorContent, title, internal: {description}}) => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      return gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/page.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          elContent: elementorContent,
          title,
          description

          // We also use the next and previous id's to query them and add links!
        },
      })
    })
  )

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1 ? `/` : `/blog/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

const size = {
  thumbnail: 150,
  medium: 300,
  "medium-large": 768,
  large: 1024,
  "1536x1536": 1536,
  "2048x2048": 2048,
  full: 2048,
};

function transformNode(nodes, { graphql, reporter }) {
  return Promise.all(nodes.map( async item => {
      if(item.elType === "widget" && item.widgetType === "image") {
          const sizeImage = await graphql(`
            query AssetHeight($url: String!){
              wpMediaItem(localFile: {url: {eq: $url}}) {
                width
                height
              }
            }
          `, {
            url: item.settings.image.url,
          })

          const query = await graphql(`
            query AssetHeight($url: String!, $size: Int!, $greater: Boolean!){
              wpMediaItem(localFile: {url: {eq: $url}}) {
                gatsbyImage(width: $size, formats: WEBP, placeholder: BLURRED) @include (if: $greater)
                localFile @skip (if: $greater) {
                  childImageSharp {
                    gatsbyImageData(height: $size, formats: WEBP, placeholder: BLURRED)
                  }
                }
              }
            }
          `, {
            url: item.settings.image.url,
            size: size[item.settings?.image_size || "large"],
            greater: sizeImage.data.wpMediaItem.width >= sizeImage.data.wpMediaItem.height
          });


          if(query.errors) {
            reporter.panicOnBuild(
              `There was an error loading your pages`,
              query.errors
            )
            return item;
          }

          item.settings.image.data = query.data?.wpMediaItem?.gatsbyImage || query.data.wpMediaItem.localFile?.childImageSharp?.gatsbyImageData;
      }

      if(item.elements?.length > 0) item.elements = await transformNode(item.elements, { graphql, reporter });

      return item;
  }))
}

async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WP_PAGES {
      allWpPage {
        nodes {
          uri
          elementorContent
          title
          internal {
              description
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.nodes;
}
