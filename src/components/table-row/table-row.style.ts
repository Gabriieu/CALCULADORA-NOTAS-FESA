import styled from "styled-components";

export const TableRowStyle = styled.tr`
  cursor: pointer;
  .class {
    font-weight: bold;
    font-style: italic;
    font-size: 0.8rem;
  }

  &.highlighted {
    background-color: #d0ebff; /* azul claro pastel */
    transition: all 0.4s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    transform: scale(1.01);
  }
`;
