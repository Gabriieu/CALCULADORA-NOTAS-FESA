import styled from "styled-components";

export const FooterStyle = styled.footer`
  margin-top: auto;
  padding: 1.5rem 1rem;
  background-color: white;
  text-align: center;
  color: #333;
  font-size: 0.95rem;
  border-top: 1px solid #ccc;
  box-shadow: 0 0 12px  black;
  margin-top: 32px;
  border-top-right-radius: 9px;
  border-top-left-radius: 9px;

  a {
    color: #0077cc;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #004d99;
    text-decoration: underline;
  }

  #developed-by {
    font-size: 0.75rem;
    color: #666;
  }
`;
