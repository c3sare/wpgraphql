import React from "react";

const sizeHeader = {
  small: 15,
  medium: 19,
  large: 29,
  xl: 39,
  xxl: 59,
};

const Heading = ({ align, title, header_size = "h2", size, link }) => {
  const textSize = sizeHeader[size]
    ? {
        fontSize: `${sizeHeader[size]}px`,
      }
    : {};

  const textElement = React.createElement(
    header_size,
    {
      style: {
        textAlign: align,
        ...textSize,
      },
    },
    title
  );

  return link.url ? (
    <a
      href={link.url}
      target={link.is_external === "on" ? "_blank" : "_self"}
      rel={link.nofollow === "on" ? "nofollow" : "noreferrer"}
    >
      {textElement}
    </a>
  ) : (
    textElement
  );
};

export default Heading;
