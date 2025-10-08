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
  background-color: #f9fafb;
  color: black;
  padding: 20px;

  h1 {
    font-size: 5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: black;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.2rem;
    color: black;
  }

  p {
    max-width: 480px;
    color: black;
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

    &:hover {
      background-color: #005fa3;
      transform: translateY(-2px);
    }
  }
`;
