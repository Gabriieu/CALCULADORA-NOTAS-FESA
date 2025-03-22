import { createGlobalStyle } from "styled-components";

export const ResetStyle = createGlobalStyle`



* {

    margin: 0;
    padding: 0;
    border: 0;
    outline:0;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    
}
html, body, div, span, applet, object,
h1, h2, h3, h4, h5, h6, p, a, del, img, 
b, u, i, ol, ul, li, form, label,article, 
aside, figure, footer, header, 
nav, section{


ol, ul {
    list-style: none;
}

blockquote, q {
    quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}

button , a , select{
    cursor: pointer;
    background-color:transparent;
    border:none;
   
}


input::placeholder{
    color: rgb(185, 185, 187);
}

dialog{
  border: solid 1px rgb(221, 219, 219);

}

dialog::backdrop{
  background-color: rgba(0, 0, 255, 0.11);
  
}

html {
    scroll-behavior: smooth;
}

}
`;
