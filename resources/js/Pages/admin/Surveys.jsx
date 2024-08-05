import React, { useState } from 'react';
import AuthenticatedLayout from '@/AdminLayouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Surveys({ auth, surveys }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this survey?')) {
            Inertia.delete(route('admin.surveys.destroy', id));
        }
    };

    // Filter surveys based on the search term
    const filteredSurveys = surveys.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.admin}
            //header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Survey List</h2>}
        >
            <Head title="Survey List">
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
             <div className="min-h-screen py-12 bg-black bg-opacity-50" >    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white">Survey List</h1>
                        </div>

                        {/* Search Bar */}
                        <div className="mb-6 flex items-center justify-center">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by survey title..."
                                    className="block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaSearch className="text-gray-500" />
                                </span>
                            </div>
                        </div>

                        {/* Survey Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSurveys.map((survey) => (
                                <div key={survey.id} className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-xl text-center mb-2">{survey.title}</h3>
                                        <p className="text-gray-700 mb-4 text-center">{survey.description}</p>
                                    </div>
                                    <div className="flex justify-between mt-auto">
                                        <Link
                                            href={route('admin.surveys.edit', survey.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                                        >
                                            <FaEdit className="mr-2" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(survey.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                                        >
                                            <FaTrashAlt className="mr-2" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
