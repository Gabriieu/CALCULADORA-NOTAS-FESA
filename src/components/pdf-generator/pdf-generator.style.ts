import styled from "styled-components";

export const PdfGeneratorStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  margin-top: 1rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.5rem 1rem;
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
`;
