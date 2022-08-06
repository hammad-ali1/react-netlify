import styled from "styled-components";

export const Wrapper = styled.button`
  display: block;
  background: var(--darkGrey);
  font-size: var(--fontMed);
  margin: 25px auto;
  transition: all 0.5s;
  outline: none;
  border: 0;
  border-radius: 30px;
  color: var(--white);
  cursor: pointer;
  padding: 15px 60px;
  :hover {
    opacity: 0.8;
  }
`;
