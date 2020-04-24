import React from "react";
import Link from "next/link";

export interface INavItemProps {
  selected?: boolean;
  name: string;
  href: string;
}

export const NavItem = ({ selected, name, href }: INavItemProps) => (
  <Link href={href}>
    <a
      className="z-40 text-xl font-thin tracking-wider cursor-pointer"
      href={href}
    >
      <li
        className={`z-40 px-4 py-2 m-2 transition-all duration-300 ease-in-out transform border ${
          selected ? "border-gray-200" : "border-transparent"
        } rounded-lg hover:border-gray-300 hover:shadow-lg hover:scale-105`}
      >
        {name}
      </li>
    </a>
  </Link>
);
