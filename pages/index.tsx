import React from "react";
import { Login } from "../components/Login";

export default function IndexPage() {
    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-center w-full h-full bg-gray-700">
                <Login />
            </div>
        </div>
    );
}
