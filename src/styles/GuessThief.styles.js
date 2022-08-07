import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 5px;
  .cards {
    display: grid;
    grid-template-areas: "main main main";
    /* "card1 card2 card3"; */
  }

  .main {
    grid-area: main;
    color: red;
  }
  .others {
    color: blue;
  }
  .column-container {
    display: flex;
    width: 40%;
    margin: auto;
    gap: 10px;
    flex-direction: column;
  }
  /* .card1 {
    grid-area: card1;
  }
  .card2 {
    grid-area: card2;
  }
  .card3 {
    grid-area: card3;
  } */

  .round {
    font-size: 20px;
    text-align: center;
  }
  .role {
    text-align: center;
  }
`;
