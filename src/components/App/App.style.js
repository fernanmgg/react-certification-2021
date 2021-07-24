import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: sans-serif;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.6;
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    background-image: linear-gradient(
      120deg,
      ${(props) => props.theme.backgroundColors[0]} 0,
      ${(props) => props.theme.backgroundColors[1]} 19%,
      ${(props) => props.theme.backgroundColors[2]} 42%,
      ${(props) => props.theme.backgroundColors[3]} 79%,
      ${(props) => props.theme.backgroundColors[4]} 100%
    );
    background-position: var(--bg-position);
    background-size: 400% 400%;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
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
