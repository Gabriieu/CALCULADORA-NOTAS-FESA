import styled, { keyframes } from "styled-components";

const menuShow = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// transparente: só captura o clique/scroll fora do menu para fechá-lo
export const MenuBackdropStyle = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
`;

export const PdfGeneratorStyle = styled.div`
  position: relative;
  /* o menu tem a mesma largura do botão, então o botão não pode ser menor que ele */
  min-width: 9.5rem;

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    font-size: 0.8rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    svg {
      color: #37474f;
      font-size: 1rem;
    }

    .caret {
      font-size: 0.7rem;
      transition: transform 0.2s ease;
    }

    &[aria-expanded="true"] .caret {
      transform: rotate(180deg);
    }

    span {
      font-weight: 500;
    }
  }

  .menu {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 0;
    right: 0;
    padding: 6px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 20;
    animation: ${menuShow} 0.15s ease-out;

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 8px 10px;
      border: none;
      border-radius: 6px;
      background: none;
      color: #333;
      font-size: 0.8rem;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      text-align: left;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }

      svg {
        font-size: 1rem;
      }

      .icon-pdf {
        color: #d32f2f;
      }

      .icon-imagem {
        color: #2e7d32;
      }
    }
  }

  @keyframes modalShow {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes backdropShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
