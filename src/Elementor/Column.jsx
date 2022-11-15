import styled from "styled-components";
import React from "react";

const Column = (props) => {
  console.log(props);
  return <div className={props.className}>{props.children}</div>;
};

const ColumnStyle = styled(Column)`
  display: flex;
  flex-direction: column;
  width: ${(props) => props._column_size}%;
  padding: 5px;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default ColumnStyle;
