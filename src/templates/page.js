import React from "react"

import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css";

import Layout from "../components/layout";
import Section from "../Elementor/Section";
import Column from "../Elementor/Column";
import Heading from "../Elementor/Heading";
import Image from '../Elementor/Image';
import TextEditor from "../Elementor/TextEditor";

import Seo from "../components/seo";
import Video from "../Elementor/Video";

const elTypes = {
    "section": Section,
    "column": Column,
    "heading": Heading,
    "image": Image,
    "text-editor": TextEditor,
    "video": Video
}

const PageTemplate = ({ pageContext: {elContent, title, description}, location }) => {
  function generatePage(nodes) {
    return nodes.map(node =>
        React.createElement.apply(
            this,
            [
                elTypes[node.elType === 'widget' ? node.widgetType : node.elType],
                {...node.settings, key: node.id, location}
            ]
        .concat(node.elements.length > 0 ? generatePage(node.elements) : [])
    ));
}

  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      {generatePage(elContent)}
    </Layout>
  )
}

export const Head = ({ pageContext: {title, description} }) => (
  <Seo title={title} description={description}/>
)

export default PageTemplate;