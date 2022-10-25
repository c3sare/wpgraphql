import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { LightBox } from "../components/layout";

const alignFlex = {
  left: "start",
  center: "center",
  right: "end",
};

const Image = ({
  image: { alt = "", url, data },
  align = "center",
  caption = "",
  caption_source = "",
  link_to = "",
  link,
}) => {
  const dispatch = React.useContext(LightBox)[1];
  const Img = <GatsbyImage image={data} alt={alt} />;
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
          target={link.is_external ? "_blank" : "_self"}
          style={{
            overflow: "hidden",
          }}
          onClick={(e) => {
            if (link_to === "file") {
              e.preventDefault();
              dispatch({
                type: "open",
                payload: [e.currentTarget.getAttribute("href")],
              });
            }
          }}
          href={link_to === "file" ? url : link.url}
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
