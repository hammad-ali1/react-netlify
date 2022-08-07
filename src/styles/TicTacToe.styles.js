import styled from "styled-components";

export const Wrapper = styled.div`
  .board-row:after {
    clear: both;
    content: "";
    display: table;
  }

  .square {
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;

    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
  }

  .square:focus {
    outline: none;
  }

  .kbd-navigation .square:focus {
    background: #ddd;
  }

  .game {
    display: flex;
    flex-direction: row;

    margin: auto;
  }
  .turn-info {
    text-align: center;
    font-style: italic;
    font-size: 24px;
  }
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    .game {
      width: 150px;
    }
    .square {
      height: 50px;
      width: 50px;
    }
    .turn-info {
      font-size: 16px;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    .game {
      width: 210px;
    }
    .square {
      height: 70px;
      width: 70px;
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .game {
      width: 300px;
    }
    .square {
      height: 100px;
      width: 100px;
    }
  }
`;
