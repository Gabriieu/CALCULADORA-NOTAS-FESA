import { createGlobalStyle } from "styled-components";
import { INTER_FONT_FACE } from "./fontes";

export const ResetStyle = createGlobalStyle`
${INTER_FONT_FACE}

* {

    margin: 0;
    padding: 0;
    border: 0;
    outline:0;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    /* a Inter é carregada em fontes.ts, igual em todos os aparelhos */
    font-family: 'Inter', system-ui, sans-serif;
    box-sizing: border-box;

}

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
`;
