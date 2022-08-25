import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  background: var(--primary);
  font-size: var(--fontMed);
  margin: 25px auto;
  transition: all 0.5s;
  outline: none;
  border: 0;
  border-radius: 30px;
  color: var(--textColor);
  cursor: pointer;
  padding: 15px 40px;
  :hover {
    opacity: 0.8;
  }
`;
