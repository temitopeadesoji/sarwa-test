import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="Sarwa Test" name="apple-mobile-web-app-title" />

          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="black-translucent"
            name="apple-mobile-web-app-status-bar-style"
          />
          <link href="/favicon.ico" rel="icon" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com/"
            crossOrigin=""
          ></link>
          <link rel="dns-prefetch" href="https://fonts.gstatic.com/"></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
