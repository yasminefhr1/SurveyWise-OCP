import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showAdminOptions, setShowAdminOptions] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [typedGroupText, setTypedGroupText] = useState('');
    const welcomeText = "Welcome to Your Survey App!";
    const groupText = "Groupe OCP";

    useEffect(() => {
        let index = 0;
        let isDeleting = false;
        const interval = setInterval(() => {
            if (isDeleting) {
                index--;
                if (index === 0) {
                    isDeleting = false;
                }
            } else {
                index++;
                if (index === welcomeText.length) {
                    isDeleting = true;
                }
            }
            setTypedText(welcomeText.slice(0, index));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index++;
            setTypedGroupText(groupText.slice(0, index));
            if (index === groupText.length) {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const handleLogoClick = () => {
        window.location.href = 'https://fr.wikipedia.org/wiki/Groupe_OCP';
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <div
                className="bg-gray-100 min-h-screen flex items-center justify-center relative"
                style={{ backgroundImage: "url('/logo/jorf-lasfar-ocp.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div 
                    className="absolute top-0 left-0 m-4 cursor-pointer flex items-center"
                    style={{ marginTop: "30px", marginLeft: "30px" }}
                    onClick={handleLogoClick}
                >
                    <img 
                        src='/logo/ocpLogo.png' 
                        alt='OCP Logo' 
                        className="border-2 border-gray-300 rounded-lg hover:border-blue-500 transition duration-300" 
                        style={{ width: "50px", height: "50px" }}
                    />
                    <p className="ml-2 text-lg font-semibold text-white">{typedGroupText}<span className="blinking-cursor-small">|</span></p>
                </div>
                <div className="relative w-full max-w-2xl px-6 py-8 lg:max-w-4xl bg-white bg-opacity-70 rounded-lg shadow-lg">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600">
                            <span className="text-yellow-500">Survey</span>Wise
                        </h1>
                    </header>

                    <main className="text-center">
                        <p className="mb-4 text-center lg:text-3xl font-bold text-lg mb-4 text-gray-800">{typedText}<span className="blinking-cursor">|</span></p>
                        <p className="text-sm text-gray-500 mb-8" style={{ fontSize: "17px" }}>Start collecting feedback and insights.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-gray-200 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-4">User</h2>
                                <button
                                    onClick={() => setShowUserOptions(!showUserOptions)}
                                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {showUserOptions ? 'Hide Options' : 'Show Options'}
                                </button>
                                {showUserOptions && (
                                    <div className="mt-4 space-y-2">
                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="block w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                            >
                                                User Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('login')}
                                                    className="block w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                >
                                                    Log in
                                                </Link>
                                                <Link
                                                    href={route('register')}
                                                    className="block w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 bg-gray-200 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-4">Admin</h2>
                                <button
                                    onClick={() => setShowAdminOptions(!showAdminOptions)}
                                    className="w-full py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    {showAdminOptions ? 'Hide Options' : 'Show Options'}
                                </button>
                                {showAdminOptions && (
                                    <div className="mt-4 space-y-2">
                                        {auth.admin ? (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="block w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route('admin.login')}
                                                    className="block w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                                >
                                                    Admin Log in
                                                </Link>
                                                <Link
                                                    href={route('admin.register')}
                                                    className="block w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                                >
                                                    Admin Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>

                    <footer className="mt-12 text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Yasmine Fihri [SurveyWise OCP]
                    </footer>
                </div>
            </div>
            <style jsx>{`
                .blinking-cursor {
                    font-weight: 100;
                    font-size: 30px;
                    color: #2E3D48;
                    -webkit-animation: 1s blink step-end infinite;
                    -moz-animation: 1s blink step-end infinite;
                    -ms-animation: 1s blink step-end infinite;
                    -o-animation: 1s blink step-end infinite;
                    animation: 1s blink step-end infinite;
                }

                .blinking-cursor-small {
                    font-weight: 100;
                    font-size: 18px;
                    color: white;
                    -webkit-animation: 1s blink step-end infinite;
                    -moz-animation: 1s blink step-end infinite;
                    -ms-animation: 1s blink step-end infinite;
                    -o-animation: 1s blink step-end infinite;
                    animation: 1s blink step-end infinite;
                }

                @keyframes blink {
                    from, to {
                        color: transparent;
                    }
                    50% {
                        color: #2E3D48;
                    }
                }

                @keyframes blink-small {
                    from, to {
                        color: transparent;
                    }
                    50% {
                        color: white;
                    }
                }
            `}</style>
        </>
    );
}
