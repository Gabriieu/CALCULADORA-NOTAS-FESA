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
        --toggle-icon: #4f46e5;
        --brilho-troca: #fbbf24;
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
        --toggle-icon: #fbbf24;
        --brilho-troca: #6ea8fe;
    }

    body{
        background-color: var(--bg-page);
        color: var(--text-strong);
    }

    /* troca de tema (theme.context.tsx): o tema novo é revelado por uma máscara circular de
       borda esfumada que cresce a partir do botão, com uma onda de luz na borda e a tela
       antiga se afastando por baixo. O raio é animado via JS; origem (--tema-x/--tema-y) e
       largura da borda (--tema-pena) são definidas na raiz durante a troca */
    @property --tema-raio{
        syntax: "<length>";
        inherits: false;
        initial-value: 0px;
    }

    /* o fade padrão da view transition sai de cena, porque as animações são feitas via JS */
    html.troca-tema::view-transition-old(root),
    html.troca-tema::view-transition-new(root){
        animation: none;
        mix-blend-mode: normal;
    }

    html.troca-tema::view-transition-old(root){
        transform-origin: var(--tema-x) var(--tema-y);
    }

    /* sem a animação do raio, a máscara fecha em 0 e a tela nova fica escondida */
    html.troca-tema::view-transition-new(root){
        mask-image: radial-gradient(
            circle at var(--tema-x) var(--tema-y),
            #000 calc(var(--tema-raio) - var(--tema-pena)),
            transparent var(--tema-raio)
        );
    }

    /* a onda é um elemento próprio (para ficar por cima das duas telas) e só existe na troca */
    .onda-tema{
        display: none;
    }

    html.troca-tema .onda-tema{
        display: block;
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        pointer-events: none;
        view-transition-name: onda-tema;
        background: radial-gradient(
            circle at var(--tema-x) var(--tema-y),
            transparent calc(var(--tema-raio) - var(--tema-pena) * 0.85),
            color-mix(in srgb, var(--brilho-troca) 55%, transparent) calc(var(--tema-raio) - var(--tema-pena) * 0.5),
            transparent calc(var(--tema-raio) - var(--tema-pena) * 0.1)
        );
    }

    html.troca-tema::view-transition-group(onda-tema),
    html.troca-tema::view-transition-new(onda-tema){
        animation: none;
        mix-blend-mode: normal;
    }

    /* a versão antiga da onda (raio 0) é invisível; escondê-la evita o fade entre as duas */
    html.troca-tema::view-transition-old(onda-tema){
        display: none;
    }

    /* a tela nova é renderizada ao vivo; sem isto, as transições de cor dos componentes
       fariam o tema novo aparecer "atrasado" dentro do círculo */
    html.troca-tema *,
    html.troca-tema *::before,
    html.troca-tema *::after{
        transition: none !important;
    }

`;
