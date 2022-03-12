import { createGlobalStyle } from "styled-components";
    

export const GlobalStyle = createGlobalStyle `
    :root{
        --maxWidth: 1280px;
        --white: #fff;
        --lightColor: #74BDDC;
        --medColor: #0A9396;
        --darkColor: #0b2d50;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }

    html {
        height: 100%;
    }

    *{
        box-sizing: border-box;
        margin:0;
    }

    body {
        margin: 0;
        padding: 0;

        h1{
            font-size: 2rem;
            font-weight: 600;
            color: var(--white);
        }

        h3{
            font-size: 1.5rem;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
        }
    }

    a:-webkit-any-link {
        text-decoration: none;
        color: inherit;
    }
    
`