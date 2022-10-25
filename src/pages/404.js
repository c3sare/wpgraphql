import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

import Layout from "../components/layout"

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <h1>404: Strony nie znaleziono</h1>
      <p>Szukana przez ciebie strona nie istnieje.</p>
      <br/>
      <Link to="/">Wróć na stronę główną</Link>
    </Layout>
  )
}

export default NotFoundPage;

export const Head = () => (
  <Seo title="404"/>
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
