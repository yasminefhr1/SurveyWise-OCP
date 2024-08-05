import React from 'react';
import { Head } from '@inertiajs/react';

export default function SurveyResponses({ responses }) {
    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
            <div className="min-h-screen py-12 bg-black bg-opacity-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg">
                        <Head title="Survey Responses" />
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Survey Responses</h1>
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Question</th>
                                        <th className="py-2 px-4 border-b text-left">Response</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responses.length > 0 ? (
                                        responses.map((response, index) => (
                                            <tr key={index}>
                                                <td className="py-2 px-4 border-b">{response.SurveyQuestion}</td>
                                                <td className="py-2 px-4 border-b">{response.responses}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="py-2 px-4 text-center">No responses found for this survey.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
