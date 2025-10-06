import styled from "styled-components";

export const AdicionarDPStyle = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

    svg {
      color: #173596ff;
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
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #fff;
    z-index: 1000;
    animation: modalShow 0.25s forwards;

    h1 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      color: #173596ff;
    }

    select {
      width: 100%;
      padding: 0.5rem;
      font-size: 0.9rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 1rem;
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

      &:hover {
        background-color: #0f276d;
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
