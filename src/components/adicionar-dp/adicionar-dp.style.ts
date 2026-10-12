import styled from "styled-components";

export const AdicionarDPStyle = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--surface);
    color: var(--text-strong);
    border: 1px solid var(--border-input);
    border-radius: 6px;
    padding: 10px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    @media (hover: hover) {
      &:hover {
        background-color: var(--hover-bg);
      }
    }

    svg {
      color: var(--blue-deep);
      font-size: 1rem;
    }

    span {
      font-weight: 500;
    }
  }

  /* Modal centralizado */
  dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    border-radius: 8px;
    padding: 2rem;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
    background-color: var(--surface);
    color: var(--text);
    z-index: 1000;
    animation: modalShow 0.25s forwards;

    h1 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      color: var(--blue-deep);
    }

    select {
      width: 100%;
      padding: 0.5rem;
      /* abaixo de 16px o Safari do iOS dá zoom na página ao focar o campo */
      font-size: 1rem;
      border: 1px solid var(--border-input);
      border-radius: 4px;
      margin-bottom: 1rem;
      background-color: var(--input-bg);
      color: var(--text-strong);
    }

    div {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    button {
      background-color: #173596ff;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 0.4rem 1rem;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.2s ease;

      @media (hover: hover) {
        &:hover {
          background-color: #0f276d;
        }
      }
    }

    #cancel {
      background-color: rgba(218, 46, 46, 1);
    }
  }

  /* Fundo semi-transparente quando o dialog estiver aberto */
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    animation: backdropShow 0.25s forwards;
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
