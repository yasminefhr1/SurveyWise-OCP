import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FaEdit, FaTrash, FaSearch, FaCheckCircle } from 'react-icons/fa'; // Import des icônes
import "../../css/styles.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const SurveyList = ({ surveys, auth }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrer les surveys en fonction du terme de recherche
    const filteredSurveys = surveys.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
            <div className="min-h-screen py-12 bg-black bg-opacity-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-8 text-center text-white">Surveys</h1>

                    {/* Barre de recherche */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by survey title..."
                                className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <FaSearch className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Liste des sondages */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSurveys.length > 0 ? (
                            filteredSurveys.map((survey) => (
                                <div key={survey.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                                    <h2 className="text-xl font-semibold mb-2">{survey.title}</h2>
                                    <p className="text-gray-700 mb-4">{survey.description}</p>
                                    <div className="flex gap-4">
                                        {auth.admin && (
                                            <>
                                                <Link
                                                    href={`/admin/surveys/${survey.id}/edit`}
                                                    className="flex items-center text-blue-500 hover:text-blue-700"
                                                >
                                                    <FaEdit className="mr-2" /> Edit
                                                </Link>
                                                <Link
                                                    href={`/admin/surveys/${survey.id}/delete`}
                                                    className="flex items-center text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash className="mr-2" /> Delete
                                                </Link>
                                            </>
                                        )}
                                        <Link
                                            href={`/surveys/${survey.id}/participate`}
                                            className="flex items-center text-green-500 hover:text-green-700"
                                        >
                                            <FaCheckCircle className="mr-2" /> Participate
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">No surveys found with the given title.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
};

export default SurveyList;
