import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export default function History({ auth, surveys }) {
    console.log('History props:', { auth, surveys });

    const [searchTerm, setSearchTerm] = useState('');

    const filteredSurveys = surveys.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const hasSurveys = Array.isArray(surveys) && surveys.length > 0;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Survey History" />
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
                <div className="min-h-screen py-12 bg-black bg-opacity-50">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="shadow-lg rounded-lg bg-white bg-opacity-10">
                            <div className="p-6 text-gray-900">
                                <h1 className="text-3xl font-bold mb-6 text-white text-center">Your Survey Participation History</h1>
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search by title..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
                                    />
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {hasSurveys && filteredSurveys.length > 0 ? (
                                        filteredSurveys.map((survey) => (
                                            <div key={survey.id} className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                                                <div className="flex flex-col flex-grow">
                                                    <h3 className="font-bold text-xl text-center mb-2 text-gray-900">{survey.title}</h3>
                                                    <p className="text-gray-700 mb-4 text-center">{survey.description}</p>
                                                </div>
                                                <div className="flex justify-center mt-4">
                                                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-green-600 transition-colors duration-300 flex items-center">
                                                        <ArrowRightIcon className="h-5 w-5 mr-2" />
                                                        Vous avez participé
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">No surveys match your search criteria.</p>
                                    )}
                                </div>
                                <div className="text-center mt-6">
                                    <p className="text-gray-500">Interested in participating in more surveys?</p>
                                    <Link href="/surveys" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
                                        View Available Surveys
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
