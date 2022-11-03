import styled from "styled-components";

const ColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props._column_size}%;
  padding: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default ColumnStyle;
