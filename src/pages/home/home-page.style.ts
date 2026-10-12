import styled, { keyframes } from "styled-components";

const fadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  60% {
    opacity: 1;
    transform: translateX(5px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// só opacidade e escala (a partir do topo): o #table-container tem overflow-x: auto, e uma
// animação que deslocasse a tabela para os lados ou para baixo faria a barra de rolagem piscar
const tabelaEntra = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.8);
  }
  50% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
  }
`;

const wiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-18deg);
  }
  40% {
    transform: rotate(16deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(6deg);
  }
`;

export const MainStyle = styled.main`
  min-height: 90vh;
  animation: ${fadeInLeft} 0.6s ease-out;

  section {
    flex: 1;
    padding: 1rem;
    width: 100vw;
    animation: ${fadeInLeft} 0.6s ease-out;
  }

  fieldset {
    border: 1px solid var(--border-input);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    background-color: var(--surface);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }

  legend {
    font-weight: bold;
    padding: 0 0.5rem;
    font-size: 1.05rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  #field-formativa {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input[type="number"] {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid var(--border-input);
    box-sizing: border-box;
    transition:
      border 0.2s ease,
      box-shadow 0.2s ease;
  }

  input[type="number"]:focus {
    border-color: #0077cc;
    box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.2);
    outline: none;
  }

  select {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-input);
    border-radius: 8px;
    background-color: var(--input-bg);
    font-size: 1rem;
    font-family: Arial, sans-serif;
    color: var(--text-strong);
    margin: 0.5rem 0;
    transition:
      border-color 0.3s,
      box-shadow 0.3s;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      outline: none;
    }

    &:disabled {
      background-color: var(--disabled-bg);
      color: var(--disabled-text);
      cursor: not-allowed;
    }
  }

  input[type="number"] {
    width: max-content;
    max-width: 80px;
  }

  #table-container {
    overflow-x: auto;
  }

  /* sombra na borda direita enquanto há colunas escondidas: no iOS a barra de rolagem só aparece
     durante o arrasto. Fica fora do #table-container, então não entra no PDF nem no PNG */
  .table-wrapper {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 28px;
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.22),
        rgba(0, 0, 0, 0)
      );
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    &[data-colunas-a-direita="true"]::after {
      opacity: 1;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    background-color: var(--surface);
    border-radius: 8px;
    /* sem overflow: hidden - ele quebra o position: sticky da coluna fixa */
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    transform-origin: top center;
    animation: ${tabelaEntra} 0.45s cubic-bezier(0.22, 1, 0.36, 1);

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .th-disciplina {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .btn-fixar-disciplina {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
    /* a margem negativa evita que o botão aumente a altura do cabeçalho */
    margin-block: -0.4rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 6px;
    background-color: transparent;
    color: #fff;
    font-size: 0.8rem;
    cursor: pointer;
    transition:
      background-color 0.2s,
      color 0.2s;
    /* toca ao montar a tabela, 3 vezes, e para */
    animation: ${pulseRing} 1.2s ease-out 0.5s 3;

    svg {
      animation: ${wiggle} 1.2s ease-in-out 0.5s 3;
    }

    &[aria-pressed="true"] {
      background-color: #fff;
      color: #0077cc;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;

      svg {
        animation: none;
      }
    }
  }

  /* coluna Disciplina fixa durante o scroll horizontal.
     Com border-collapse a borda vertical não acompanha a célula sticky, por
     isso ela é redesenhada com box-shadow inset. */
  table[data-disciplina-fixa="true"] {
    thead tr:first-child th:first-child,
    tbody td:first-child {
      position: sticky;
      left: 0;
      box-shadow:
        inset -1px 0 0 var(--border),
        3px 0 5px -2px rgba(0, 0, 0, 0.25);
    }

    thead tr:first-child th:first-child {
      background-color: #0077cc;
    }

    tbody td:first-child {
      background-color: var(--surface);

      @media (hover: hover) {
        &:hover {
          background-image: linear-gradient(
            rgba(13, 110, 253, 0.05),
            rgba(13, 110, 253, 0.05)
          );
        }
      }
    }
  }

  #table-bottom {
    margin: 2.5rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    #table-bottom-left {
      display: flex;
      gap: 1rem;
    }
  }

  thead {
    background-color: #0077cc;
    color: white;
  }

  th,
  td {
    border: 1px solid var(--border);
    padding: 0.6rem;
    text-align: center;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--scroll-track);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #0077cc;
    border-radius: 6px;
    border: 2px solid var(--scroll-thumb-border);
  }

  @media (min-width: 768px) {
    section {
      max-width: 800px;
      margin: 0 auto;
    }

    fieldset {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    label {
      margin: 0;
      white-space: nowrap;
    }

    select,
    input[type="number"] {
      width: auto;
    }

    #semestre {
      width: 200px;
    }

    footer {
      font-size: 1rem;
    }
  }
`;
