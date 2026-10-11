import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root{
        --theme-light:rgb(255, 255, 255);
        --theme-dark:rgb(0, 0, 0);
        --theme-test:rgb(255, 0, 0);

        /* tema claro (padrão) */
        color-scheme: light;
        --bg-page: #fff;
        --surface: #fff;
        --surface-alt: #f8f9fa;
        --input-bg: #fff;
        --text-strong: #000;
        --text: #333;
        --text-muted: #555;
        --text-faint: #aaa;
        --border: #ddd;
        --border-input: #ccc;
        --hover-bg: #f2f2f2;
        --disabled-bg: #eee;
        --disabled-text: #777;
        --accent-text: #0077cc;
        --primary-text: #0d6efd;
        --blue-deep: #173596;
        --nota-vermelha: red;
        --nota-azul: blue;
        --media-azul: #007bff;
        --media-vermelha: #dc3545;
        --btn-neutral-bg: #e9ecef;
        --btn-neutral-hover: #d6d8db;
        --icon-neutral: #37474f;
        --icon-pdf: #d32f2f;
        --icon-img: #2e7d32;
        --social-github: #181717;
        --social-linkedin: #0e76a8;
        --scroll-track: #ddd;
        --scroll-thumb-border: #f1f1f1;
        --shadow-header: 0 2px 10px rgba(0, 0, 0, 0.12);
    }

    :root[data-theme="dark"]{
        color-scheme: dark;
        --bg-page: #121417;
        --surface: #1c2025;
        --surface-alt: #171a1e;
        --input-bg: #14171a;
        --text-strong: #f1f3f5;
        --text: #dee2e6;
        --text-muted: #a3acb7;
        --text-faint: #7b8490;
        --border: #333a42;
        --border-input: #454d57;
        --hover-bg: #2a3038;
        --disabled-bg: #2a2f36;
        --disabled-text: #7b8490;
        --accent-text: #4aa8f0;
        --primary-text: #6ea8fe;
        --blue-deep: #8ea6ff;
        --nota-vermelha: #ff6b6b;
        --nota-azul: #7aa7ff;
        --media-azul: #4da3ff;
        --media-vermelha: #ff6b7a;
        --btn-neutral-bg: #343a40;
        --btn-neutral-hover: #454d55;
        --icon-neutral: #b0bec5;
        --icon-pdf: #ef5350;
        --icon-img: #66bb6a;
        --social-github: #f0f6fc;
        --social-linkedin: #3ba0d6;
        --scroll-track: #2a2f36;
        --scroll-thumb-border: #1c2025;
        --shadow-header: 0 2px 12px rgba(0, 0, 0, 0.5);
    }

    body{
        background-color: var(--bg-page);
        color: var(--text-strong);
    }

`;
