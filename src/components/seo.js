import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title }) => {
  const { wp, wpUser } = useStaticQuery(
    graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }

        # if there's more than one user this would need to be filtered to the main user
        wpUser {
          twitter: name
        }
      }
    `
  )

  const metaDescription = description || wp.generalSettings?.description
  const defaultTitle = wp.generalSettings?.title

  return (
    <>
      <title>{title} | {defaultTitle}</title>
      <meta name="description" title={metaDescription}/>
      <meta name="og:title" title={title}/>
      <meta name="og:description" title={metaDescription}/>
      <meta name="og:type" title="website"/>
      <meta name="twitter:card" title="summary"/>
      <meta name="twitter:creator" title={wpUser?.twitter || ``}/>
      <meta name="twitter:title" title={title}/>
      <meta name="twitter:description" title={metaDescription}/>
    </>
  )
}

export default Seo
