import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

// a partir daqui os links ficam na barra e o hambúrguer some
const BREAKPOINT_DESKTOP = "640px";

// o reset global zera o outline de todos os elementos, então o foco precisa ser redesenhado
const anelDeFoco = css`
  &:focus-visible {
    outline: 2px solid var(--primary-text);
    outline-offset: 2px;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  box-shadow: var(--shadow-header);
  margin-bottom: 20px;
  background-color: var(--surface);
  color: var(--text-strong);

  .header-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .hamburger-react:focus-visible {
    outline: 2px solid var(--primary-text);
    outline-offset: -2px;
    border-radius: 8px;
  }

  @media (min-width: ${BREAKPOINT_DESKTOP}) {
    .menu-botao {
      display: none;
    }
  }
`;

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-right: auto;
  border-radius: 8px;
  color: var(--text-strong);
  font-size: 1.05rem;
  font-weight: 700;
  white-space: nowrap;

  img {
    width: 50px;
    height: auto;
    flex-shrink: 0;
  }

  ${anelDeFoco}
`;

export const ThemeToggle = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--text);
  font-size: 1.2rem;
  transition: background 0.2s ease;

  &:hover {
    background: var(--hover-bg);
  }

  ${anelDeFoco}

  @media (min-width: ${BREAKPOINT_DESKTOP}) {
    order: 2;
  }
`;

export const Navegacao = styled.nav<{ $aberto: boolean }>`
  /* no mobile é um dropdown ancorado na borda inferior do header */
  display: ${({ $aberto }) => ($aberto ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: calc(100% + 6px);
  right: 1rem;
  min-width: 170px;
  padding: 0.5rem 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: ${slideDown} 0.3s ease forwards;

  a {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.2rem;
    color: var(--text);
    font-weight: 500;
    font-size: 0.95rem;
    transition: background 0.2s ease;

    svg {
      flex-shrink: 0;
      font-size: 1.1rem;
    }

    &:hover {
      background: var(--hover-bg);
    }

    &.active {
      color: var(--blue-deep);
      box-shadow: inset 3px 0 0 var(--blue-deep);
    }

    /* o menu tem overflow: hidden, então o anel de foco fica por dentro */
    &:focus-visible {
      outline: 2px solid var(--primary-text);
      outline-offset: -2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: ${BREAKPOINT_DESKTOP}) {
    display: flex;
    flex-direction: row;
    position: static;
    order: 1;
    min-width: 0;
    padding: 0;
    background: none;
    border: none;
    box-shadow: none;
    overflow: visible;
    animation: none;

    a {
      padding: 0.5rem 0.8rem;
      border-radius: 8px;

      &.active {
        box-shadow: inset 0 -2px 0 var(--blue-deep);
        border-radius: 8px 8px 0 0;
      }

      &:focus-visible {
        outline-offset: 2px;
      }
    }
  }
`;
