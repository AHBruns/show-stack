// cSpell:enableCompoundWords

import React from "react";
import Link from "next/link";

export const Nav = ({ items, currentItem }) => (
  <nav className="flex flex-col flex-wrap items-center w-full p-4 bg-red-600 border-b border-red-700 shadow-2xl sm:flex-row">
    <h1 className="flex-1 text-2xl font-semibold tracking-wider text-gray-900 cursor-pointer hover:underline focus:outline-none focus:underline">
      <Link href="/dashboard">
        <a href="/dashboard">ShowStack</a>
      </Link>
    </h1>
    <nav className="flex flex-wrap justify-center mt-2 sm:gap-4 sm:grid sm:grid-flow-col-dense sm:mt-0">
      {items.map((item) => (
        <button
          key={item.text}
          onClick={item.onClick}
          className={`inline-block px-4 py-2 text-lg font-light text-gray-900 rounded-lg focus:bg-red-700 hover:bg-red-700 hover:shadow-inner hover:text-white focus:shadow-inner focus:text-white focus:outline-none ${
            item.text === currentItem ? "font-bold" : ""
          }`}
        >
          {item.text}
        </button>
      ))}
    </nav>
  </nav>
);
