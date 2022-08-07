import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;
  h1 {
    color: var(--white);
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%/2, max(100px, 100%/7)), 1fr)
  );
  //max columns 6, min colmns 2
  grid-gap: 2rem;
`;
