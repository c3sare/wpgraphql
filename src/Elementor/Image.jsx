import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { LightBox } from "../components/layout";

const alignFlex = {
  left: "start",
  center: "center",
  right: "end",
};

const Image = (props) => {
  const {
    image,
    align = "center",
    caption = "",
    caption_source = "",
    link_to = "",
    link,
    open_lightbox,
  } = props;
  console.log(props);

  const dispatch = React.useContext(LightBox)[1];
  const Img = <GatsbyImage image={image.data} alt={image.alt} />;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: align,
        alignItems: alignFlex[align],
      }}
    >
      {link_to === "custom" || link_to === "file" ? (
        <a
          rel="noreferrer"
          target={open_lightbox === "no" ? "_blank" : "_self"}
          style={{
            overflow: "hidden",
          }}
          onClick={(e) => {
            if (
              (link_to === "file" && open_lightbox === "yes") ||
              (link_to === "file" && !open_lightbox)
            ) {
              e.preventDefault();
              dispatch({
                type: "open",
                payload: [e.currentTarget.getAttribute("href")],
              });
            }
          }}
          href={link_to === "file" ? image.fullSizeUrl : link.url}
        >
          {Img}
        </a>
      ) : (
        <div
          style={{
            overflow: "hidden",
          }}
        >
          {Img}
        </div>
      )}
      {caption_source === "custom" && (
        <span style={{ color: "grey" }}>{caption}</span>
      )}
    </div>
  );
};

export default Image;
