import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/AdminLayouts/AuthenticatedLayout';
import { FaEye, FaChartBar, FaFileExcel } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const transformDataForExport = (responses) => {
    if (!Array.isArray(responses) || responses.length === 0) return [];

    return responses.map(response => ({
        question: response.question?.text || 'N/A',
        response: response.response || 'N/A'
    }));
};

const exportToCSV = (survey) => {
    if (!survey || !survey.responses) {
        console.error('No survey data available for export:', survey);
        alert('No survey data available.');
        return;
    }

    const transformedData = transformDataForExport(survey.responses);
    console.log('Transformed Data for Export:', transformedData);

    if (transformedData.length === 0) {
        console.error('No responses available to export.');
        alert('No responses available to export.');
        return;
    }

    const csv = Papa.unparse(transformedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${survey.title}.csv`);
};

export default function Results({ auth, surveys }) {
    if (!surveys || surveys.length === 0) {
        return <div className="text-center text-gray-700 mt-8">No surveys available.</div>;
    }

    return (
        <AuthenticatedLayout user={auth.admin}>
            <Head title="Survey List">
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
                <div className="py-12 bg-black bg-opacity-50" style={{ height: '680px' }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold text-white mb-8">Survey Results</h1>
                            {surveys.map((survey) => (
                                <div
                                    key={survey.id}
                                    className="bg-gray-200 rounded-lg p-6 mb-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                                >
                                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">{survey.title}</h2>
                                    <p className="text-gray-600 mb-4">{survey.description}</p>
                                    <div className="flex gap-4">
                                        <Link
                                            href={`/admin/results/${survey.id}/results`}
                                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 ease-in-out"
                                        >
                                            <FaEye className="mr-2 text-lg" />
                                            View Results
                                        </Link>
                                        <Link
                                            href={`/admin/surveys/${survey.id}/graphs`}
                                            className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 ease-in-out"
                                        >
                                            <FaChartBar className="mr-2 text-lg" />
                                            Graphs
                                        </Link>
                                        <button
                                            onClick={() => exportToCSV(survey)}
                                            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 ease-in-out"
                                        >
                                            <FaFileExcel className="mr-2 text-lg" />
                                            Export CSV
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
