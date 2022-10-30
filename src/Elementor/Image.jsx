import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { LightBox } from "../components/layout";
import styled from "styled-components";

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
    align_mobile,
    align_tablet,
    caption = "",
    caption_source = "",
    link_to = "",
    link = { url: "" },
    open_lightbox = "yes",
    location,
  } = props;
  console.log(props);

  const Container = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      text-align: ${align};
      align-items: ${alignFlex[align]};
    }

    @media (max-width: 1023.99px and min-width: 768px) {
      text-align: ${align_tablet || align};
      align-items: ${alignFlex[align_tablet || align]};
    }

    @media (max-width: 767.99px) {
      text-align: ${align_mobile || align};
      align-items: ${alignFlex[align_mobile || align]};
    }
  `;

  const Caption = styled.span`
    color: grey;
  `;

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
      onClick={(e) => {
        if (link_to === "file" && open_lightbox === "yes") {
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
    <Container>
      {link_to === "custom" || link_to === "file" ? (
        external || link_to === "file" ? (
          externalOrImage
        ) : (
          notExternal
        )
      ) : (
        <div>{Img}</div>
      )}
      {caption_source === "custom" && <Caption>{caption}</Caption>}
    </Container>
  );
};

export default Image;
