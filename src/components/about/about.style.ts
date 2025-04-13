import styled from "styled-components";

export const AboutStyle = styled.div`
  #modal-background {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    backdrop-filter: blur(2px);
  }

  .icon {
    font-size: 1.8rem;
    color: #444;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .icon:hover {
    color: #007bff;
  }

  dialog {
    z-index: 1;
    width: 100vw;
    padding: 1rem;
    background: #fff;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 1100;
    animation: slideUp 0.777s ease;

    .modal-header {
      display: flex;
      justify-content: flex-end;
    }

    button {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: red;
    }

    h2 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    strong {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-style: oblique;
    }

    p {
      text-align: justify;
      line-height: 1.4;
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }

    #att {
      font-size: 0.8rem;
      font-style: italic;
      color: gray;
    }
  }

  .icon.blink {
    animation: blinkAnim 2s ease-in-out infinite;
  }

  @keyframes blinkAnim {
    0%,
    100% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    dialog {
      max-width: 50vw;
      left: 50%;
      bottom: 1rem;
    }
  }
`;
