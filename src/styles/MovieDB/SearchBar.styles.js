import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  background: var(--darkGrey);
  padding: 0 20px;
`;

export const Content = styled.div`
  position: relative;
  max-width: var(--maxWidth);
  width: 100%;
  height: 55px;
  background: var(--medGrey);
  margin: 0 auto;
  color: var(--white);
  border-radius: 40px;

  .searchIcon {
    position: absolute;
    left: 15px;
    top: 8px;
    width: 30px;
    height: 40px;
  }
  input {
    font-size: var(--fontMed);
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 60px;
    background: transparent;
    height: 40px;
    width: 95%;
    color: var(--white);
    border: 0;
    :focus {
      outline: none;
    }
  }
`;
