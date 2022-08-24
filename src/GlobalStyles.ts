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
      color : var(--textColor)
    }
   
    

 
  }
`;
