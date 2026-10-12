import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Page404Style = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  text-align: center;
  background-color: var(--surface-alt);
  color: var(--text-strong);
  padding: 20px;

  h1 {
    font-size: 5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-strong);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.2rem;
    color: var(--text-strong);
  }

  p {
    max-width: 480px;
    color: var(--text-strong);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  a {
    display: inline-block;
    background-color: #0077cc;
    color: white;
    padding: 0.7rem 1.4rem;
    border-radius: 8px;
    font-size: 1rem;
    text-decoration: none;
    transition: background-color 0.25s ease, transform 0.25s ease;

    @media (hover: hover) {
      &:hover {
        background-color: #005fa3;
        transform: translateY(-2px);
      }
    }
  }
`;
