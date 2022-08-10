import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  overflow: auto;

  :hover {
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background: grey;
    }
  }
  ::-webkit-scrollbar {
    height: 5px;
  }

  div {
    min-height: min(23vh, 300px);
    min-width: min(23vw, 100px);
    /* min-width: max(min(22%, 200px), 100px); */

    /* max-width: 200px; */
    /* width: 55vw; */
    background: white;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

export const Content = styled.div``;

export const Text = styled.div``;
