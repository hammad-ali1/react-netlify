import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  transition: all 1s;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
  gap: 10px;
  .text {
    flex: 1;
    align-self: center;
  }
`;
