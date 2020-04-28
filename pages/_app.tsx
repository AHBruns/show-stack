import React from "react";
import Head from "next/head";
import "../public/tailwind.css";
import "loaders.css";
import { Header } from "../components/NEW/Header";
import { UserProvider } from "../contexts/User.context";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";

export default ({ Component, pageProps }) => (
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
        <SWRConfig value={{ fetcher }}>
            <UserProvider>
                <div className="flex flex-col w-full h-full bg-white">
                    <Header hideOn={new Set([, "/", "/register"])} />
                    <main className="relative flex flex-col flex-1 w-full">
                        <Component {...pageProps} />
                    </main>
                </div>
            </UserProvider>
        </SWRConfig>
    </>
);
