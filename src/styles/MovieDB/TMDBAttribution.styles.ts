import styled from "styled-components";

export const Wrapper = styled.div`
  /* position: relative; */
  /* margin-top: auto; */
  bottom: 0px;
  width: 100%;
  background: var(--darkGrey);
  display: flex;
  gap: 5px;
  padding: 5px 30px;
  justify-content: space-between;
  .text {
    width: 100%;
    text-align: center;
  }
  p {
    font-size: 12px;
    padding: 0 15px;
  }
  @media screen and (max-width: 500px) {
    p {
      font-size: 8px;
    }
  }
`;

export const TMDBLogoImg = styled.img`
  width: 100px;

  @media screen and (max-width: 500px) {
    width: 80px;
  }
`;
