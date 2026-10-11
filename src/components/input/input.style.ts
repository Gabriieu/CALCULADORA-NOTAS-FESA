import styled from "styled-components";

export const InputStyle = styled.input`
  padding: 6px;
  border: 2px solid var(--border-input);
  border-radius: 4px;
  outline: none;
  background-color: var(--input-bg);
  color: var(--text-strong);

  &.vermelho {
    /* !important define prioridade de estilo */
    border-color: var(--nota-vermelha) !important;
    color: var(--nota-vermelha);
  }

  &.azul {
    border-color: var(--nota-azul) !important;
    color: var(--nota-azul);
  }
`;
