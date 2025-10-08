import styled, { keyframes } from "styled-components";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const AboutPageStyle = styled.div`
  animation: ${fadeInScale} 0.6s ease-out;
  display: flex;
  justify-content: center;
  min-height: 80vh;
  color: #222;
  padding: 40px 20px;

  .about-container {
    max-width: 720px;
    background: #fff;
    padding: 32px 28px;
    text-align: center;
    line-height: 1.7;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    h1 {
      font-size: 2rem;
      margin-bottom: 24px;
      font-weight: 700;
      color: #0077cc;
    }

    p {
      font-size: 1rem;
      margin-bottom: 18px;
      color: black;
      text-align: justify;
    }

    strong {
      color: #000;
      font-weight: 600;
    }

    .divider {
      width: 60%;
      height: 1px;
      background: #ddd;
      margin: 32px auto;
    }
  }

  @media (max-width: 600px) {
    .about-container {
      padding: 24px 20px;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 0.95rem;
      }
    }
  }
`;
