import React from "react";
import { LightBox } from "../components/layout";

const size = {
  thumbnail: "150px",
  medium: "300px",
  "medium-large": "768px",
  large: "1024px",
  "1536x1536": "1536px",
  "2048x2048": "2048px",
  full: "100%",
};

const alignFlex = {
  left: "start",
  center: "center",
  right: "end",
};

const Image = ({
  image: { alt = "", url },
  align = "center",
  caption = "",
  caption_source = "",
  image_custom_dimension,
  image_size = "large",
  link_to = "",
  link,
}) => {
  const [__state, dispatch] = React.useContext(LightBox);
  const Img = (
    <img
      src={url}
      alt={alt}
      style={image_size === "custom" ? {} : { maxWidth: size[image_size] }}
    />
  );
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
          rel={"noreferrer"}
          target={link.is_external ? "_blank" : "_self"}
          style={{
            overflow: "hidden",
            ...(image_size === "custom"
              ? {
                  width: `${image_custom_dimension.width}px`,
                  height: `${image_custom_dimension.height}px`,
                }
              : {}),
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
            ...(image_size === "custom"
              ? {
                  width: `${image_custom_dimension.width}px`,
                  height: `${image_custom_dimension.height}px`,
                }
              : {}),
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
