import styled, { keyframes } from "styled-components";

const piscar = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

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

export const BotaoAvisoExameStyle = styled.button`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-left: 0.35rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--media-vermelha);
  font-size: 1.1rem;
  cursor: pointer;
  animation: ${piscar} 1.2s ease-in-out infinite;
  /* na célula de DP, a lixeira cobre a célula inteira (z-index 10) */
  position: relative;
  z-index: 11;

  &:focus-visible {
    outline: 2px solid var(--primary-text);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// o fundo centraliza o modal; clicar nele fecha o aviso
export const BackgroundAvisoExameStyle = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
`;

export const ModalAvisoExameStyle = styled.div`
  width: 100%;
  max-width: 440px;
  padding: 1.8rem 2rem;
  border-radius: 15px;
  background-color: var(--surface);
  color: var(--text);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: ${modalAppear} 0.25s ease-out;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--media-vermelha);
  }

  .text {
    margin-bottom: 1rem;
    line-height: 1.5;
    text-align: center;
  }

  .text strong {
    color: var(--text-strong);
  }

  .fechar {
    display: block;
    width: 100%;
    margin-top: 1.5rem;
    padding: 0.65rem 1rem;
    border-radius: 8px;
    background-color: var(--btn-neutral-bg);
    color: var(--text-strong);
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--btn-neutral-hover);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--primary-text);
      outline-offset: 2px;
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
  }
`;
