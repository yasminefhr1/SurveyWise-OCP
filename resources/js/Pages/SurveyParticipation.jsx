import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaCheckCircle } from 'react-icons/fa'; // Icône pour le bouton de soumission

export default function SurveyParticipation({ auth, survey }) {
    const submitResponses = async (responses) => {
        try {
            const response = await axios.post(`/surveys/${survey.id}/submit`, { responses });
            console.log(response.data); // Gérer la réponse du serveur si nécessaire
            window.alert('Survey submitted successfully!');
            // Redirection ou autre action après soumission réussie
        } catch (error) {
            console.error('Erreur lors de la soumission des réponses :', error);
            window.alert('An error occurred while submitting the survey. Please try again.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const responses = {};
    
        survey.questions.forEach((question) => {
            const inputName = `question_${question.id}`;
            const response = formData.getAll(inputName);
            responses[question.id] = response.length > 1 ? response : response[0]; // Gérer les réponses uniques et multiples
        });
    
        submitResponses(responses);
    };
    
    const renderQuestion = (question) => {
        switch (question.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name={`question_${question.id}`}
                        required
                    />
                );
            case 'paragraph':
                return (
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                        name={`question_${question.id}`}
                        required
                    />
                );
            case 'multiple-choice':
                const options = JSON.parse(question.options);
                return (
                    <>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                    name={`question_${question.id}`}
                                    value={option}
                                />
                                <span className="ml-2 text-gray-800">{option}</span>
                            </div>
                        ))}
                    </>
                );
            case 'one-choice':
                const radioOptions = JSON.parse(question.options);
                return (
                    <>
                        {radioOptions.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                    name={`question_${question.id}`}
                                    value={option}
                                />
                                <span className="ml-2 text-gray-800">{option}</span>
                            </div>
                        ))}
                    </>
                );
            case 'dropdown':
                const selectOptions = JSON.parse(question.options);
                return (
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name={`question_${question.id}`}
                    >
                        {selectOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Participate in Survey" />
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
             <div className="min-h-screen py-12 bg-black bg-opacity-50" >
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white shadow-lg sm:rounded-lg border border-gray-300 p-6">
                            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">{survey.title}</h1>
                            <p className="mb-6 text-center text-gray-700">{survey.description}</p>
                            <form onSubmit={handleSubmit}>
                                {survey.questions && survey.questions.length > 0 ? (
                                    survey.questions.map((question, index) => (
                                        <div key={question.id} className="mb-6">
                                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                                {index + 1}. {question.text}
                                            </label>
                                            {renderQuestion(question)}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600">No questions available for this survey.</p>
                                )}
                                <div className="flex justify-center mt-6">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center"
                                    >
                                        <FaCheckCircle className="mr-2 text-white" /> Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
