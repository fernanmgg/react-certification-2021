import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 1.125rem;
    line-height: 1.6;
    font-weight: 400;
    font-family: sans-serif;
    box-sizing: border-box;
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    background-image: linear-gradient(
      120deg,
      ${(props) => props.theme.backgroundColors[0]} 0,
      ${(props) => props.theme.backgroundColors[1]} 19%,
      ${(props) => props.theme.backgroundColors[2]} 42%,
      ${(props) => props.theme.backgroundColors[3]} 79%,
      ${(props) => props.theme.backgroundColors[4]} 100%
    );
    background-size: 400% 400%;
    background-position: var(--bg-position);
    transition: background-position 2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export { GlobalStyle };
