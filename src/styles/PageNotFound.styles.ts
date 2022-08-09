import styled from "styled-components";
export const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;

type props = {
  img: "*.png" | "*.svg";
};
export const Content = styled.div<props>`
  position: relative;
  overflow: auto;
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ img }) => `url(${img}), #151729`};
`;

export const Text = styled.div`
  text-align: center;
  .icon {
    display: block;
    margin: 0 auto;
    font-size: 5em;
  }
  h2 {
    font-size: 18vh;
    margin: 0 0 5px 0;
    color: #fff;
  }
  h4 {
    font-size: 1.4em;
    margin-bottom: 20px;
    color: #fff;
    font-weight: 700;
    padding: 10px 20px;
    display: inline-block;
  }
  p {
    color: #fff;
    font-size: 1.2em;
    max-width: 70%;
    margin: auto;
  }
`;
