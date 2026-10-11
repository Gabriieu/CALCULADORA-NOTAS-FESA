// ShareButtonStyle.ts
import styled from "styled-components";

export const BackgroundStyle = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.33);
`;

export const ShareButtonStyle = styled.div`
  #share-header {
    font-size: 14px;
    font-weight: 700;
  }

  position: relative;
  display: inline-block;

  > button {
    color: var(--text-strong);
  }

  svg:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export const ShareOptions = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0;
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border-input);
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;

  a,
  button {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--text);
    background: none;
    border: none;
    padding: 6px 10px;
    text-align: left;
    width: 100%;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: var(--hover-bg);
    }
  }

  @media (min-width: 600px) {
    width: auto;
    min-width: 220px;
  }
`;
