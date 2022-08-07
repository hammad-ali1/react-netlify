import styled from "styled-components";

export const Wrapper = styled.div`
  .player-name {
    text-align: center;
    margin: 5px;
  }
`;

export const Card = styled.div`
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100px;
    height: 170px;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 150px;
    height: 170px;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 200px;
    height: 200px;
  }
  position: relative;
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px;
  margin: auto;
  color: black;
  padding: 5px;
  animation: ${(props) =>
    props.show ? "show 4s forwards" : "hide 4s forwards"};
  @keyframes hide {
    from {
      color: transparent;
    }
    to {
      color: transparent;
      transform: rotateY(180deg);
    }
  }
  @keyframes show {
    from {
      transform: rotateY(180deg);
      color: transparent;
    }
    to {
      transform: rotateY(360deg);
      color: black;
    }
  }
  :hover {
    box-shadow: 3px 3px 3px grey;
  }

  img {
    width: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    animation: ${(props) =>
      props.show ? "showImage 4s forwards" : "hideImage 4s forwards"};
    @keyframes hideImage {
      from {
        visibility: hidden;
      }
      to {
        visibility: hidden;
      }
    }
    @keyframes showImage {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }
  }
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .points {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
`;
