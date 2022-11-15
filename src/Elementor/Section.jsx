import React from "react";
import styled from "styled-components";

const Section = (props) => {
  const {
    content_position,
    className,
    content_width = { size: 100, unit: "%" },
    gap,
    height_inner,
    html_tag = "div",
    overflow,
    structure = "11",
  } = props;
  console.log(props);
  return React.createElement(html_tag, { className }, props.children);
};

const SectionStyled = styled(Section)`
  width: 100%;
  display: flex;
  padding: 5px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default SectionStyled;
