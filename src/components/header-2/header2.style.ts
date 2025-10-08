import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 12px black;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  margin-bottom: 20px;
  background-color: white;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }  img {
    width: 50px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 64px;
  right: 1rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 0.5rem 0;
  animation: slideDown 0.3s ease forwards;
  min-width: 150px;

  a {
    padding: 0.8rem 1.2rem;
    color: #333;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: background 0.2s ease;

    &:hover {
      background: #f2f2f2;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  padding: 0.8rem 1.2rem;
  width: 100%;
  transition: background 0.2s ease;

  &:hover {
    background: var(--hover-bg);
  }
`;