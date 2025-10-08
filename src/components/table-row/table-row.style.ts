import styled, { keyframes } from "styled-components";

export const TableRowStyle = styled.tr`
  cursor: context-menu;

  .class {
    font-weight: bold;
    font-style: italic;
    font-size: 0.8rem;
    transition: background 0.2s;
  }

  .class:hover {
    background-color: rgba(13, 110, 253, 0.05);
  }

  .DP::after {
    content: " (DP)";
    color: #888;
    font-weight: normal;
  }
`;

const modalAppear = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const TableRowDialogStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  padding: 2rem 2.2rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 420px;
  animation: ${modalAppear} 0.25s ease;

  .title {
    font-size: 1rem;
    color: #dc3545;
    font-weight: 800;
    text-align: center;
    margin-bottom: 0.6rem;
  }


  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .confirm {
      background-color: #dc3545;
      color: #fff;

      &:hover {
        background-color: #bb2d3b;
      }
    }

    .cancel {
      background-color: #e9ecef;
      color: #333;

      &:hover {
        background-color: #d6d8db;
      }
    }
  }
`;

export const BackgroudModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
