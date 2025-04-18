import styled from "styled-components";

export const FooterStyle = styled.footer`
  margin-top: 50px;
  padding: 1.5rem 1rem;
  background-color: #f8f9fa;
  color: #333;
  text-align: center;
  font-size: 0.95rem;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  #footer-header {
    margin-bottom: 0.5rem;
  }

  #developed-by {
    font-size: 0.85rem;
    color: #555;
    font-weight: 500;
  }

  #footer-socials {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    margin-top: 0.5rem;
    font-size: 1.6rem;
  }

  #footer-socials a {
    transition: transform 0.2s ease, color 0.3s ease;
  }

  #footer-socials a:hover {
    transform: scale(1.2);
  }

  #github {
    color: #181717;
  }

  #linkedin {
    color: #0e76a8;
  }

  #portfolio {
    color: #3a3f44;
  }

  a:hover {
    transform: scale(1.2);
  }
  #footer-note {
    font-size: 12px;
    color: #aaa;
    margin-top: .5rem;

    @media (max-width: 600px) {
      font-size: 10px;
    }
  }
`;
