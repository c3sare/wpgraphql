import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default Section;
