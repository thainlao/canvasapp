'use client'
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Eclipse Worspace</title>
        <meta name="description" content="Описание вашей страницы для SEO" />
        <meta name="keywords" content="ключевые слова, через, запятую" />
        <meta name="author" content="Ваше имя" />
        <link rel="canonical" href="https://ваш-сайт.com" />
      </Head>
      <body>
        <SessionProvider>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
