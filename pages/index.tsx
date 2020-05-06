import React from "react";
import Link from "next/link";

export default function IndexPage() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = React.useState(false);

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-full bg-white">
            <div className="w-full">
                <div className="relative w-full overflow-hidden bg-white">
                    <div className="max-w-screen-xl mx-auto ">
                        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <svg
                                className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg>
                            <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                                    <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                        <div className="flex items-center justify-between w-full md:w-auto">
                                            <a href="">
                                                <img
                                                    className="w-auto h-8 sm:h-10"
                                                    src="/android-chrome-512x512.png"
                                                />
                                            </a>
                                            <div className="flex items-center -mr-2 md:hidden">
                                                <button
                                                    onClick={() => {
                                                        setMobileMenuIsOpen(
                                                            true
                                                        );
                                                    }}
                                                    type="button"
                                                    className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-white focus:outline-none focus:bg-white focus:text-gray-500"
                                                >
                                                    <svg
                                                        className="w-6 h-6"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:ml-10 md:pr-4">
                                        <Link href="/dashboard">
                                            <a
                                                href="/dashboard"
                                                className="font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
                                            >
                                                Dashboard
                                            </a>
                                        </Link>
                                        <Link href="/register">
                                            <a
                                                href="/register"
                                                className="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
                                            >
                                                Register
                                            </a>
                                        </Link>
                                        <Link href="/login">
                                            <a
                                                href="/login"
                                                className="ml-8 font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-900 focus:outline-none focus:text-blue-700"
                                            >
                                                Log in
                                            </a>
                                        </Link>
                                    </div>
                                </nav>
                            </div>
                            <div
                                className={`absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden ${
                                    mobileMenuIsOpen
                                        ? "duration-100 ease-in opacity-100 scale-100 pointer-events-auto"
                                        : "duration-150 ease-out opacity-0 scale-95 pointer-events-none"
                                }`}
                            >
                                <div className="rounded-lg shadow-md">
                                    <div className="overflow-hidden bg-white rounded-lg shadow-xs">
                                        <div className="flex items-center justify-between px-5 pt-4">
                                            <div>
                                                <img
                                                    className="w-auto h-8"
                                                    src="/android-chrome-192x192.png"
                                                />
                                            </div>
                                            <div className="-mr-2">
                                                <button
                                                    onClick={() => {
                                                        setMobileMenuIsOpen(
                                                            false
                                                        );
                                                    }}
                                                    type="button"
                                                    className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-white focus:outline-none focus:bg-white focus:text-gray-500"
                                                >
                                                    <svg
                                                        className="w-6 h-6"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-2 pt-2 pb-3">
                                            <Link href="/dashboard">
                                                <a
                                                    href="/dashboard"
                                                    className="block px-3 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                                                >
                                                    Dashboard
                                                </a>
                                            </Link>
                                            <Link href="/register">
                                                <a
                                                    href="/register"
                                                    className="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                                                >
                                                    Register
                                                </a>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link href="/login">
                                                <a
                                                    href="/login"
                                                    className="block w-full px-5 py-3 font-medium text-center text-blue-600 transition duration-150 ease-in-out bg-gray-50 hover:bg-white hover:text-blue-700 focus:outline-none focus:bg-white focus:text-blue-700"
                                                >
                                                    Log in
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                                        All your shows & movies
                                        <span className="hidden xl:inline">
                                            {" "}
                                        </span>
                                        <br className="xl:hidden" />
                                        <span className="text-blue-600">
                                            in one place
                                        </span>
                                    </h2>
                                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        WatchThis is your universal watch queue.
                                        Gone are the days of maintaining
                                        different queues on all your favorite
                                        streaming platforms. WatchThis is your
                                        single source of truth for all your
                                        favorite series & movies.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <Link href="/register">
                                                <a
                                                    href="/register"
                                                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline md:py-4 md:text-lg md:px-10"
                                                >
                                                    Get started
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <Link href="/register">
                                                <a
                                                    href="/login"
                                                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-blue-700 transition duration-150 ease-in-out bg-blue-100 border border-transparent rounded-md hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:shadow-outline focus:border-blue-300 md:py-4 md:text-lg md:px-10"
                                                >
                                                    Log in
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            className="object-cover w-full h-56 transform scale-110 shadow-inner sm:h-72 md:h-96 lg:w-full lg:h-full"
                            src="cover-poster.png"
                        />
                        <div className="absolute inset-0 bg-blue-300 shadow-inner bg-opacity-50" />
                    </div>
                </div>
            </div>
            <div className="w-full bg-white">
                <div className="max-w-screen-xl px-4 pt-12 pb-16 mx-auto sm:pt-16 sm:pb-20 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
                    <h2 className="text-3xl font-extrabold leading-9 text-gray-900">
                        Frequently asked questions
                    </h2>
                    <div className="pt-10 mt-6 border-t-2 border-white">
                        <dl className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <div>
                                    <dt className="text-lg font-medium leading-6 text-gray-900">
                                        Does WatchThis track which platform a
                                        show is on?
                                    </dt>
                                    <dd className="mt-2">
                                        <p className="text-base leading-6 text-gray-500">
                                            Sort of. We allow you to annote
                                            shows with information like `where
                                            to watch` and there are plans to add
                                            crowdsourced platform inforamtion
                                            for popular shows, but this is not a
                                            current feature.
                                        </p>
                                    </dd>
                                </div>
                                <div className="mt-12">
                                    <dt className="text-lg font-medium leading-6 text-gray-900">
                                        Why not just write this on a piece of
                                        paper?
                                    </dt>
                                    <dd className="mt-2">
                                        <p className="text-base leading-6 text-gray-500">
                                            By tracking your watch list on
                                            WatchThis you get to take advantage
                                            of some built-in features like
                                            automatic genre, run time, and
                                            primary actor annotations, etc.
                                            Also, a digital list makes
                                            collaboration (for example, between
                                            multiple family members) far easier.
                                        </p>
                                    </dd>
                                </div>
                                <div className="mt-12">
                                    <dt className="text-lg font-medium leading-6 text-gray-900">
                                        How much is this going to cost me?
                                    </dt>
                                    <dd className="mt-2">
                                        <p className="text-base leading-6 text-gray-500">
                                            Nothing -- for now. WatchThis is
                                            under development at the moment, but
                                            we will likely add a premium plan in
                                            the future. Stay tuned on this
                                            front.
                                        </p>
                                    </dd>
                                </div>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <div>
                                    <dt className="text-lg font-medium leading-6 text-gray-900">
                                        How do you make money?
                                    </dt>
                                    <dd className="mt-2">
                                        <p className="text-base leading-6 text-gray-500">
                                            We don't -- for now. Eventually we
                                            plan to add a premium tier to the
                                            service, and possibly sell
                                            anonymized user data, but we promise
                                            to never sell personally identifying
                                            info. As the saying goes, don't be
                                            evil.
                                        </p>
                                    </dd>
                                </div>
                                <div className="mt-12">
                                    <dt className="text-lg font-medium leading-6 text-gray-900">
                                        How is this different from ReelGood
                                    </dt>
                                    <dd className="mt-2">
                                        <p className="text-base leading-6 text-gray-500">
                                            At the moment we're very similar,
                                            but WatchThis has a stronger focus
                                            on UX over features. We don't think
                                            most people want to track every
                                            episode of every show they watch. If
                                            you do, ReelGood is a great
                                            alternative. Additionally, our
                                            planned crowdsourced platform info
                                            feature will be a large defining
                                            difference.
                                        </p>
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="relative w-full bg-gray-800">
                <div className="h-56 overflow-hidden sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
                    <img
                        className="object-cover w-full h-full transform scale-110 opacity-50"
                        src="cover-poster.png"
                        alt="Cover Poster"
                    />
                </div>
                <div className="relative max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:py-16">
                    <div className="md:ml-auto md:w-1/2 md:pl-10">
                        <div className="text-base font-semibold leading-6 tracking-wider text-gray-300 uppercase">
                            A Universal Watch Queue
                        </div>
                        <h2 className="mt-2 text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10">
                            Interested in WatchThis
                        </h2>
                        <p className="mt-3 text-lg leading-7 text-gray-300">
                            Checkout the beta by registering below, and be sure
                            to use the bug reporting feature to let us know
                            about any problems you encounter.
                        </p>
                        <div className="mt-8">
                            <div className="inline-flex rounded-md shadow">
                                <Link href="/register">
                                    <a
                                        href="/register"
                                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-gray-900 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-600 focus:outline-none focus:shadow-outline"
                                    >
                                        Register for WatchThis
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white">
                <div className="max-w-screen-xl px-4 py-12 mx-auto overflow-hidden sm:px-6 lg:px-8">
                    <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                        <div className="px-5 py-2">
                            <Link href="/dashboard">
                                <a
                                    href="/dashboard"
                                    className="text-base leading-6 text-gray-500 hover:text-gray-700"
                                >
                                    Dashboard
                                </a>
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link href="/watched">
                                <a
                                    href="/watched"
                                    className="text-base leading-6 text-gray-500 hover:text-gray-700"
                                >
                                    Watched
                                </a>
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link href="/register">
                                <a
                                    href="/register"
                                    className="text-base leading-6 text-gray-500 hover:text-gray-700"
                                >
                                    Register
                                </a>
                            </Link>
                        </div>
                        <div className="px-5 py-2">
                            <Link href="/login">
                                <a
                                    href="/login"
                                    className="text-base leading-6 text-gray-500 hover:text-gray-700"
                                >
                                    Login
                                </a>
                            </Link>
                        </div>
                    </nav>
                    <hr className="max-w-xs mx-auto mt-4" />
                    <div className="mt-4">
                        <p className="text-base leading-6 text-center text-gray-500">
                            WatchThis · 2020
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
