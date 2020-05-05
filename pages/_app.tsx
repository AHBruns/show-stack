import React from "react";
import Head from "next/head";
import "../public/tailwind.css";
import "loaders.css";
import { Header } from "../components/Header";
import { UserProvider } from "../contexts/User.context";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { TMDBProvider } from "../contexts/TMDB.context";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <title>Watch This Show!</title>
            </Head>
            <style jsx global>{`
                html,
                body,
                #__next {
                    height: 100%;
                }
            `}</style>
            <SWRConfig value={{ fetcher }}>
                <TMDBProvider>
                    <UserProvider>
                        <div className="flex flex-col w-full h-full bg-white">
                            <Header hideOn={new Set([, "/", "/register"])} />
                            <main className="relative flex flex-col flex-1 w-full">
                                <Component {...pageProps} />
                            </main>
                        </div>
                    </UserProvider>
                </TMDBProvider>
            </SWRConfig>
        </>
    );
}
