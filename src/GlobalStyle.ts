import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --white: #fff;
    --lightGrey: #eee;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }



  body {
    overflow: overlay;
    position: relative;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color : #0b0d15dc;
    color: #fffdfdc7;
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
      color: #fffdfdc7;
    }
    ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.2);
    border-radius: 20px;
    opacity: 0.5;
   
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: grey;
    opacity: 0.5;
  }

  ::-webkit-scrollbar {
    width: 10px;
    
  }
  }
`;
