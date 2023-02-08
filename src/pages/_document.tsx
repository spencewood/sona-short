import { Head, Html, Main, NextScript } from "next/document";
import Header from "../components/header";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
