import React from "react";
import Link from "next/link";

export interface INavItemProps {
    selected?: boolean;
    name: string;
    href: string;
    onClick?: () => void;
}

export const NavItem = ({ selected, name, href, onClick }: INavItemProps) => (
    <Link href={href}>
        <a
            className="z-40 text-xl font-thin tracking-wider cursor-pointer"
            href={href}
        >
            <li
                onClick={onClick}
                className={`z-40 px-2 sm:px-4 py-1 sm:py-2 m-2 transition-all duration-300 ease-in-out transform border ${
                    selected ? "border-gray-200" : "border-transparent"
                } rounded-md sm:rounded-lg hover:border-gray-300 text-sm sm:text-lg hover:shadow-lg sm:hover:scale-105`}
            >
                {name}
            </li>
        </a>
    </Link>
);
