import styled from "styled-components";

export const InputStyle = styled.input`
  padding: 6px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;

  &.vermelho {
    /* !important define prioridade de estilo */
    border-color: red !important;
    color: red;
  }

  &.azul {
    border-color: blue !important;
    color: blue;
  }
`;
