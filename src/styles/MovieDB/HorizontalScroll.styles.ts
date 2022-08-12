import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  padding: 20px 10px;
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: grey;
  }

  ::-webkit-scrollbar {
    height: 8px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(min(100%/2, max(125px, 100%/7)), 1fr);
  gap: 5px;
`;

export const Text = styled.div``;
