import React from 'react';
import AuthenticatedLayout from '@/AdminLayouts/AuthenticatedLayout';
import { FaUser, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

export default function SurveyResults({ survey, responses }) {
    if (!responses || !Array.isArray(responses)) {
        return <div className="text-center text-gray-700">No responses available.</div>;
    }

    // Regroupez les réponses par user_id
    const groupedResponses = responses.reduce((acc, response) => {
        const userId = response.user_id; // Assurez-vous que chaque réponse a un user_id
        if (!acc[userId]) {
            acc[userId] = [];
        }
        acc[userId].push(response);
        return acc;
    }, {});

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
            <div className="min-h-screen py-12 bg-black bg-opacity-50" >
                
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden">
                            <div className="p-6 text-gray-900">
                                <h1 className="text-3xl font-bold mb-6 flex items-center">
                                    <FaQuestionCircle className="mr-3 text-blue-500" />
                                    Results for: {survey.title}
                                </h1>

                                {/* Afficher les réponses par user_id */}
                                {Object.entries(groupedResponses).map(([userId, responses]) => (
                                    <div key={userId} className="bg-gray-100 rounded-lg p-6 mb-6 shadow-md">
                                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                                            <FaUser className="mr-2 text-green-500" />
                                            User ID: {userId}
                                        </h3>
                                        {responses.map((response, index) => (
                                            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                                <div className="mb-2">
                                                    <strong className="text-gray-800">Question:</strong> 
                                                    <p className="text-gray-700">{response.question.text}</p>
                                                </div>
                                                <div>
                                                    <strong className="text-gray-800">Answer:</strong> 
                                                    <p className="text-gray-700">{response.response}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                {/* Message si aucune réponse n'est disponible */}
                                {Object.keys(groupedResponses).length === 0 && (
                                    <p className="text-center text-gray-700">No responses available for this survey.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
