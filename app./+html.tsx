import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';
import Head from 'expo-router/head';
import React from 'react';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Add any additional <head> elements that you want globally available on web... */}
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1577822032490041344/9sm_ZYGp_400x400.jpg" type="image/jpeg" />
        
        {/* Google tag (gtag.js)
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L0KCEMVECM"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L0KCEMVECM');
        `}} /> */}
      </head>
      <Head>
        <title>Seahawks Today</title>
        <meta name="description" content="An unfiltered Seahawks blog with insightful analysis." />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/1577822032490041344/9sm_ZYGp_400x400.jpg" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
