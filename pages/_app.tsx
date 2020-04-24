import React from "react";
import Head from "next/head";
import "../public/tailwind.css";
import "loaders.css";
import { Header } from "../components/Header";
import { ModalsStackProvider } from "../contexts/ModalsStackContext";

const staticProps = {
  header: {
    hideOn: new Set([, /*"/"*/ "/login", "/register", "/forgot-password"]), // TODO : refactor to use a regex
  },
};

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }
      `}</style>
      <ModalsStackProvider>
        <div className="flex flex-col w-full h-full bg-white">
          <Header {...staticProps.header} />
          <div className="relative flex flex-col flex-1 w-full">
            <Component {...pageProps} />
          </div>
        </div>
      </ModalsStackProvider>
    </>
  );
};
