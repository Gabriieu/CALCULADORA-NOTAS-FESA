import styled, { keyframes } from "styled-components";

const modalAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// o fundo centraliza o modal; clicar nele fecha a confirmação
export const BackgroundConfirmacaoStyle = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
`;

export const ModalConfirmacaoStyle = styled.div`
  width: 100%;
  max-width: 440px;
  padding: 1.8rem 2rem;
  border-radius: 15px;
  background-color: var(--surface);
  color: var(--text);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: ${modalAppear} 0.25s ease-out;

  .title {
    font-size: 1.4rem;
    font-weight: 800;
    text-align: center;
    color: var(--media-vermelha);
    margin-bottom: 1rem;
  }

  .text {
    line-height: 1.5;
    text-align: center;
    color: var(--text);
    margin-bottom: 1.5rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.65rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }

      &:focus-visible {
        outline: 2px solid var(--primary-text);
        outline-offset: 2px;
      }
    }

    .cancel {
      background-color: var(--btn-neutral-bg);
      color: var(--text-strong);

      &:hover {
        background-color: var(--btn-neutral-hover);
      }
    }

    .confirm {
      background-color: #dc3545;
      color: #fff;

      &:hover {
        background-color: #bb2d3b;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;

    .buttons {
      flex-direction: column-reverse;
    }
  }
`;
