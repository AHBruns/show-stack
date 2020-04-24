import React from "react";
import { NavItem } from "./Header/NavItem";

export const Header = ({ hideOn }) => {
  const content = (
    <nav className="z-40 w-full bg-white border-b border-gray-200 shadow-2xl">
      <ul className="z-40 flex flex-wrap items-center justify-center w-full h-full p-2">
        <NavItem name="Home" href="/" />
        <NavItem selected name="Dashboard" href="/dashboard" />
        <NavItem name="Settings" href="/settings" />
      </ul>
    </nav>
  );

  return (
    <header className="z-40 w-full">
      <div className="fixed top-0 z-40 w-full ">{content}</div>
      <div className="z-40 w-full opacity-0 pointer-events-none">{content}</div>
    </header>
  );
};
