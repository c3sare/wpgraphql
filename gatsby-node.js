const path = require(`path`)
const chunk = require(`lodash/chunk`);

exports.createPages = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities);
  const pages = await getPages(gatsbyUtilities);
  const pagesElementor = await getElementorPages(pages, gatsbyUtilities);

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
    if(item.elementorContent.length > 0) item.elementorContent = await transformNode(JSON.parse(JSON.stringify(JSON.parse(item.elementorContent))), gatsbyUtilities);
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
      return gatsbyUtilities.actions.createPage({
        path: uri,
        component: path.resolve(`./src/templates/page.js`),
        context: {
          elContent: elementorContent,
          title,
          description
        },
      })
    })
  )

const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(`
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
          return page === 1 ? `/` : `/blog/${page}`
        }

        return null
      }

      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),
        component: path.resolve(`./src/templates/blog-post-archive.js`),
        context: {
          offset: index * postsPerPage,
          postsPerPage,
          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

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

function transformNode(nodes, { graphql, reporter }) {
  return Promise.all(nodes.map( async item => {
      if(item.elType === "widget" && item.widgetType === "image") {
        const sizeImage = await graphql(`
          query getImageSize($url: String!){
            wpMediaItem(sourceUrl: {eq: $url}) {
              width
              height
            }
          }
        `, {
          url: `${item.settings.image.url}`,
        });
        console.log(item.settings.image.url);

        const size = {
          thumbnail: 150,
          medium: 300,
          "medium-large": 768,
          large: 1024,
          "1536x1536": 1536,
          "2048x2048": 2048,
          full: sizeImage.data.wpMediaItem.width,
          custom: 100
        };

          const heightRatio = sizeImage.data.wpMediaItem.height/sizeImage.data.wpMediaItem.width;
          const widthRatio = sizeImage.data.wpMediaItem.width/sizeImage.data.wpMediaItem.height;

          const query = await graphql(`
            query getImage($url: String!, $size: Int!, $greater: Boolean!, $custom: Boolean!, $x: Int!, $y: Int!){
              wpMediaItem(sourceUrl: {eq: $url}) {
                gatsbyImage(width: $size, formats: WEBP, placeholder: BLURRED) @include (if: $greater)
                localFile @skip (if: $greater) {
                  childImageSharp @skip (if: $custom) {
                    gatsbyImageData(height: $size, formats: WEBP, placeholder: BLURRED)
                  }
                  childrenImageSharp @include (if: $custom) {
                    gatsbyImageData(height: $x, width: $y, formats: WEBP, placeholder: BLURRED, transformOptions: {cropFocus: CENTER})
                  }
                }
              }
            }
          `, {
            url: item.settings.image.url,
            size: size[item.settings?.image_size || "large"],
            greater: item.settings?.image_size === "custom" ? false : sizeImage.data.wpMediaItem.width >= sizeImage.data.wpMediaItem.height,
            custom: item.settings.image_size === "custom",
            x: Number(Math.floor(
              item.settings?.image_custom_dimension?.height ||
              item.settings?.image_custom_dimension?.width*heightRatio ||
              sizeImage.data.wpMediaItem.height
            )),
            y: Number(Math.floor(
              item.settings?.image_custom_dimension?.width ||
              item.settings?.image_custom_dimension?.height*widthRatio ||
              sizeImage.data.wpMediaItem.width
            ))
          });

          if(query.errors) {
            reporter.panicOnBuild(
              `There was an error loading your pages`,
              query.errors
            )
            return item;
          }

          if(item.settings.image_size === "custom") {
            item.settings.image.data = query.data.wpMediaItem.localFile.childrenImageSharp[0].gatsbyImageData;
            console.log({custom: query.data.wpMediaItem.localFile.childrenImageSharp});
          } else if(sizeImage.data.wpMediaItem.width >= sizeImage.data.wpMediaItem.height) {
            item.settings.image.data = query.data.wpMediaItem.gatsbyImage;
            // console.log({width: query.data.wpMediaItem.gatsbyImage})
          } else if(sizeImage.data.wpMediaItem.width < sizeImage.data.wpMediaItem.height) {
            item.settings.image.data = query.data.wpMediaItem.localFile.childImageSharp?.gatsbyImageData;
            // console.log({height: query.data.wpMediaItem.localFile.childImageSharp?.gatsbyImageData})
          }
      }

      if(item.elements?.length > 0) item.elements = await transformNode(item.elements, { graphql, reporter });

      return item;
  }))
}

async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(`
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
