import React from "react";
import styled from "styled-components";

const sizeHeader = {
  small: 15,
  medium: 19,
  large: 29,
  xl: 39,
  xxl: 59,
};

const Heading = (props) => {
  const {
    align,
    align_mobile,
    align_tablet,
    title,
    header_size = "h2",
    size,
    link,
  } = props;

  console.log(props);

  const StyledHeader = styled[header_size]`
    ${(props) =>
      props.size
        ? `
      font-size: ${props.sizeHeader[props.size]}px;
    `
        : ""}
    ${(props) =>
      (props.align && !props.align_tablet) ||
      (props.align && !props.align_mobile)
        ? `
      text-align: ${props.align}
    `
        : ""}

    ${(props) =>
      (props.align && props.align_mobile) || (props.align && props.align_tablet)
        ? `
      @media (min-width: 1024px) {
        text-align: ${props.align};
      }`
        : ""}

    ${(props) =>
      props.align_tablet
        ? `
      @media (max-width: 1023.99px and min-width: 768px) {
        text-align: ${props.align_tablet || props.align};
      }`
        : ""}

    ${(props) =>
      props.align_mobile
        ? `
      @media (max-width: 767.99px) {
        text-align: ${props.align_mobile || props.align};
      }`
        : ""}
  `;

  const heading = (
    <StyledHeader
      size={size}
      sizeHeader={sizeHeader}
      align={align}
      align_mobile={align_mobile}
      align_tablet={align_tablet}
    >
      {title}
    </StyledHeader>
  );

  return link?.url ? (
    <a
      href={link.url}
      target={link.is_external === "on" ? "_blank" : "_self"}
      rel="noreferrer"
    >
      {heading}
    </a>
  ) : (
    heading
  );
};

export default Heading;
