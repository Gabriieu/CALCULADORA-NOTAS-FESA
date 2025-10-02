import styled, { keyframes } from "styled-components";

// Animação de fade + scale
const modalAppear = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const AvisoModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 2rem 2.5rem;
  border-radius: 15px;
  border: none;
  max-width: 500px;
  width: 90%;
  background-color: #f9f9f9;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: ${modalAppear} 0.3s ease-out;

  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

  .title {
    font-size: 1.6rem;
    color: #0d6efd;
    font-weight: 800;
    text-align: center;
    margin-bottom: 1rem;
  }

  .text {
    text-align: justify;
    line-height: 1.5;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    button {
      flex: 1;
      padding: 0.6rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }

    #agree {
      background-color: #0d6efd;
      color: #fff;

      &:hover {
        background-color: #0b5ed7;
      }
    }

    #disagree {
      background-color: #dc3545;
      color: #fff;

      &:hover {
        background-color: #bb2d3b;
      }
    }

    .disabled{
      
    }
  }
`;

export const BackgroudModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
`;
