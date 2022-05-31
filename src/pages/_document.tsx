import { Html, Head, Main, NextScript } from 'next/document'
import { FC } from 'react';

const Document: FC = () => (
  <Html>
    <Head>
      <title>Lunis</title>
      <meta name="description" content="lunis assistant" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document