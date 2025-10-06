import styled from "styled-components";

export const PdfGeneratorStyle = styled.div`
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
      color: #d32f2f;
      font-size: 1rem;
    }

    span {
      font-weight: 500;
    }
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
