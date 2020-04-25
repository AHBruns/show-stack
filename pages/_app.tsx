import React from "react";
import Head from "next/head";
import "../public/tailwind.css";
import "loaders.css";
import { Header } from "../components/Header";
import { ModalsStackProvider } from "../contexts/ModalsStackContext";
import { StackProvider } from "../contexts/StackContext";
import { NotificationsProvider } from "../contexts/NotificationsContext";
import { Notifications } from "../components/Notifications";
import { ApolloProvider } from "@apollo/client";
import { client } from "../gql/client";

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
      <ApolloProvider client={client}>
        <NotificationsProvider>
          <StackProvider>
            <ModalsStackProvider>
              <div className="flex flex-col w-full h-full bg-white">
                <Header {...staticProps.header} />
                <div className="relative flex flex-col flex-1 w-full">
                  <Component {...pageProps} />
                </div>
                <Notifications />
              </div>
            </ModalsStackProvider>
          </StackProvider>
        </NotificationsProvider>
      </ApolloProvider>
    </>
  );
};
