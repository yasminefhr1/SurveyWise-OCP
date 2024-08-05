import { useState } from 'react';
import ApplicationLogo from '@/Components/AapplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { FaHome, FaPlus, FaList, FaChartPie, FaSignOutAlt } from 'react-icons/fa';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center space-x-8">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                    <FaHome className="mr-2 " />
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('admin.newsurvey')} active={route().current('admin.newsurvey')}>
                                    <FaPlus className="mr-2 " />
                                    New Survey
                                </NavLink>
                                <NavLink href={route('admin.surveys')} active={route().current('admin.surveys')}>
                                    <FaList className="mr-2 " />
                                    Survey List
                                </NavLink>
                                <NavLink href={route('admin.results')} active={route().current('admin.results')}>
                                    <FaChartPie className="mr-2 " />
                                    Survey Results
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-800 bg-white hover:text-gray-600 focus:outline-none transition duration-150 ease-in-out"
                                        >
                                            {user?.name || 'Guest'}
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <FaSignOutAlt className="mr-2 inline-block" />
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-600 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                            <FaHome className="mr-2 " />
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.newsurvey')} active={route().current('admin.newsurvey')}>
                            <FaPlus className="mr-2 " />
                            New Survey
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.surveys')} active={route().current('admin.surveys')}>
                            <FaList className="mr-2 " />
                            Survey List
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('admin.results')} active={route().current('admin.results')}>
                            <FaChartPie className="mr-2 " />
                            Survey Results
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user?.name || 'Guest'}</div>
                            <div className="font-medium text-sm text-gray-500">{user?.email || 'No email provided'}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                <FaSignOutAlt className="mr-2 " />
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
