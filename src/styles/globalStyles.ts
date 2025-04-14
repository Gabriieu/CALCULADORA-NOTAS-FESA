import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root{
       
        
        --theme-light:rgb(255, 255, 255);
        --theme-dark:rgb(0, 0, 0);
        --theme-test:rgb(255, 0, 0);
        
        & ::-webkit-scrollbar{
            display: none;
        }

    }


`;
