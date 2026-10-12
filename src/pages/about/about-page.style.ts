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
  color: var(--text);
  padding: 24px 16px 40px;

  .about-container {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    line-height: 1.7;
  }

  .about-hero {
    text-align: center;
    padding: 8px 8px 4px;

    h1 {
      font-size: 2rem;
      margin-bottom: 12px;
      font-weight: 700;
      color: var(--accent-text);
    }

    p {
      color: var(--text);
    }
  }

  strong {
    color: var(--text-strong);
    font-weight: 600;
  }

  .about-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px 24px 20px;

    h2 {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 14px;
      color: var(--text-strong);

      svg {
        flex-shrink: 0;
        color: var(--accent-text);
      }
    }

    p {
      margin-bottom: 14px;
      color: var(--text);
    }

    p:last-child {
      margin-bottom: 0;
    }
  }

  .about-card.warning {
    border-left: 4px solid var(--media-vermelha);

    h2 svg {
      color: var(--media-vermelha);
    }
  }

  .danger-zone {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    margin-top: 20px;
    padding: 18px;
    border: 1px solid var(--media-vermelha);
    border-radius: 10px;
    background: var(--surface-alt);

    h3 {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 4px;
      color: var(--media-vermelha);
    }

    .danger-text p {
      margin: 0;
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    .btn-apagar {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0.65rem 1.1rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: #fff;
      background: #dc3545;
      border-radius: 8px;
      transition: background-color 0.2s ease, transform 0.2s ease;

      @media (hover: hover) {
        &:hover:enabled {
          background: #bb2d3b;
          transform: translateY(-2px);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--primary-text);
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
        color: var(--disabled-text);
        background: var(--disabled-bg);
      }
    }

    .sem-dados {
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  }

  .about-contact {
    text-align: center;
    color: var(--text);

    p {
      margin-bottom: 12px;
    }

    .contact-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0.55rem 1.1rem;
      font-weight: 600;
      color: var(--text-strong);
      background: var(--btn-neutral-bg);
      border-radius: 8px;
      transition: background-color 0.2s ease, transform 0.2s ease;

      @media (hover: hover) {
        &:hover {
          background: var(--btn-neutral-hover);
          transform: translateY(-2px);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--primary-text);
        outline-offset: 2px;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 16px;

    .about-hero h1 {
      font-size: 1.6rem;
    }

    .about-card {
      padding: 20px 18px 16px;

      h2 {
        font-size: 1.1rem;
      }
    }

    .danger-zone {
      padding: 16px;

      .btn-apagar {
        width: 100%;
        justify-content: center;
      }
    }
  }
`;
