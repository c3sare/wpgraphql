import React from "react"
import { graphql } from "gatsby"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout";
import Seo from "../components/seo";
import Section from "../Elementor/Section";
import Column from "../Elementor/Column";
import Heading from "../Elementor/Heading";
import Image from '../Elementor/Image';
import TextEditor from "../Elementor/TextEditor";

const elTypes = {
    "section": Section,
    "column": Column,
    "heading": Heading,
    "image": Image,
    "text-editor": TextEditor,
}

function generatePage(nodes) {

    return nodes.map(node =>
        React.createElement.apply(
            this,
            [
                elTypes[node.elType === 'widget' ? node.widgetType : node.elType],
                {...node.settings}
            ]
        .concat(node.elements.length > 0 ? generatePage(node.elements) : [])
    ));
}

const PageTemplate = ({ data: { wpPage: {title, elementorContent, internal} } }) => {
  const nodes = JSON.parse(elementorContent).slice(0, 2);
  console.log(nodes);

  return (
    <Layout>
      <Seo title={title} description={internal.description} />
      <h1>{title}</h1>
      {generatePage(nodes)}
    </Layout>
  )
}

export default PageTemplate;

export const pageQuery = graphql`
  query PageById(
    $id: String!
  ) {
    wpPage(id: {eq: $id}) {
        title
        elementorContent
        internal {
            description
        }
    }
  }
`
