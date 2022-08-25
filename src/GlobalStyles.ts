import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --white: #fff;
    --secondary: #353535;
    --primary: #1c1c1c;
    --textColor:#fffdfdc7;
    --transparentBackground: rgba(0, 0, 0, 0.2);
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Abel', sans-serif;
  }


  .textColor{
      color : var(--textColor) !important;

    }
    .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .blueHeading{
    color:#4075e0;
    position:relative;
    margin-bottom:15px !important;
  }
  .blueHeading::before{
    position:absolute;
    bottom:0;
    height:4px;
    width:50%;
    display:block;
    margin:0;
    border-radius: 10px;
    content:"";
    background: rgb(64,117,224);
background: linear-gradient(90deg, rgba(64,117,224,0.9196720924698004) 0%, rgba(64,117,224,0.46589057986475846) 49%, rgba(64,117,224,0) 100%);
  }
  body {
    margin: 0;
    padding: 0;
    background-color : var(--secondary);
    color: var(--textColor);
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
    }
    a{
      text-decoration: none;
      color : var(--textColor);
      margin: none;
    }
  
  }
`;
