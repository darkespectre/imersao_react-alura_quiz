import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  body {
    display: flex;
    flex-direction: column;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  @keyframes slide-left {
    0% {
      transform: translateX(100vw);
      opacity: 0;
    }
    100% {
      transform: translateX(0vw);
      opacity: 1;
    }
  }
  @keyframes slide-right {
    0% {
      transform: translateX(-100vw);
      opacity: 0;
    }
    100% {
      transform: translateX(0vw);
      opacity: 1;
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes slide-down {
    0% {
      transform: translateY(-100vh);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0vh);
      opacity: 1;
    }
  }
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>HTML | Alura Quiz</title>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-48.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
