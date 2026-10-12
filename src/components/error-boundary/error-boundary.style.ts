import styled from "styled-components";

export const ErroTelaStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: var(--bg-page);
  color: var(--text-strong);

  h1 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }

  p {
    max-width: 480px;
    color: var(--text);
    line-height: 1.6;
    margin-bottom: 1.6rem;
  }

  button {
    padding: 0.7rem 1.4rem;
    border-radius: 8px;
    background-color: #0077cc;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;

    &:focus-visible {
      outline: 2px solid var(--primary-text);
      outline-offset: 2px;
    }
  }
`;
