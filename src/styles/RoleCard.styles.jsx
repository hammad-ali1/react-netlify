import styled from "styled-components";

export const Wrapper = styled.div``;

export const Card = styled.div`
  position: relative;
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px;
  margin: 10px;
  color: black;
  padding: 5px;
  animation: ${(props) =>
    props.show ? "show 4s forwards" : "hide 4s forwards"};
  /* animation: hide 4s infinite; */
  /* backface-visibility: hidden; */
  @keyframes hide {
    to {
      transform: rotateY(180deg);
    }
    20% {
      color: transparent;
    }
    100% {
      color: transparent;
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
    animation: ${(props) =>
      props.show ? "showImage 4s forwards" : "hideImage 4s forwards"};
    @keyframes hideImage {
      20% {
        visibility: hidden;
      }
      100% {
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
