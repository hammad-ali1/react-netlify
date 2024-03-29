import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  max-width: 720px;
  object-fit: cover;
  transition: all 1s;
  border-radius: 20px;
  animation: animateThumb 0.5s;
  :hover {
    opacity: 0.5;
  }
  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
