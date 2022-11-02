import React from "react";
import styled from "styled-components";

const DividerWrapper = styled.div`
  width: 100%;
  text-align: ${(props) => props.align};
  padding: 15px 0;
`;

const DividerStyled = styled.div`
  width: ${(props) => `${props.width?.size || 100}${props.width?.unit || "%"}`};
  position: relative;
  height: 20px;
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    ${(props) =>
      ["solid", "double", "dotted", "dashed"].includes(props.styleBorder)
        ? `border-top: 1px ${props.styleBorder} black;`
        : `border-top-width: 1px;
            border-top-color: black;
            border-top-image: "/";
        `}
    position: absolute;
    top: 9px;
  }
`;

const Divider = (props) => {
  const { width, align, style = "solid" } = props;
  console.log(props);

  return (
    <DividerWrapper align={align}>
      <DividerStyled styleBorder={style} width={width} />
    </DividerWrapper>
  );
};

export default Divider;
