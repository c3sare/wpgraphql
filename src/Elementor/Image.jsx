import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { LightBox } from "../components/layout";

const alignFlex = {
  left: "start",
  center: "center",
  right: "end",
};

const Image = (props) => {
  const [external, setExternal] = React.useState(false);
  const {
    image,
    align = "center",
    caption = "",
    caption_source = "",
    link_to = "",
    link = { url: "" },
    open_lightbox,
    location,
  } = props;
  console.log(props);

  React.useEffect(() => {
    const checkDomain = function (url) {
      if (url.indexOf("//") === 0) {
        url = location.protocol + url;
      }
      return url
        .toLowerCase()
        .replace(/([a-z])?:\/\//, "$1")
        .split("/")[0];
    };

    const isExternal = function (url) {
      return (
        (url.indexOf(":") > -1 || url.indexOf("//") > -1) &&
        checkDomain(location.href) !== checkDomain(url)
      );
    };
    console.log(link?.url);
    console.log(isExternal(link?.url));

    if (isExternal(link?.url)) {
      setExternal(true);
    }
  }, [link, location]);

  const dispatch = React.useContext(LightBox)[1];
  const Img = <GatsbyImage image={image.data} alt={image.alt} />;

  const externalOrImage = (
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
      href={link_to === "file" ? image.fullSizeUrl : link?.url}
    >
      {Img}
    </a>
  );

  const notExternal = <Link to={link?.url}>{Img}</Link>;

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
        external ? (
          externalOrImage
        ) : (
          notExternal
        )
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
