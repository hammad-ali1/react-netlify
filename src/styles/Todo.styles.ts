import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 5px;
  p {
    text-align: center;
  }
  .grid {
    display: grid;
    gap: 10px;
    padding: 10px;
  }

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
