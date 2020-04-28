import React from "react";
import { NavItem } from "./NavItem";
import UserContext from "../../contexts/User.context";
import { useRouter } from "next/router";

export const Header = ({ hideOn }) => {
    const [_, __, userOperations] = React.useContext(UserContext);
    const router = useRouter();

    const content = (
        <nav className="z-40 w-full bg-white border-b border-gray-200 shadow-2xl">
            <ul className="z-40 flex items-center justify-start w-full h-full p-1 overflow-scroll sm:p-2 sm:justify-center sm:flex-wrap">
                <NavItem selected name="Dashboard" href="/dashboard" />
                <NavItem
                    name="Logout"
                    href="/"
                    onClick={userOperations.clearLocalStorage}
                />
            </ul>
        </nav>
    );

    return (
        <header
            className={`z-40 w-full ${
                hideOn.has(router.asPath) ? "hidden" : "block"
            }`}
        >
            <div className="fixed top-0 z-40 w-full ">{content}</div>
            <div className="z-40 w-full opacity-0 pointer-events-none">
                {content}
            </div>
        </header>
    );
};
