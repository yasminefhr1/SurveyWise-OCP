import React from 'react';
import { Head } from '@inertiajs/react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import AuthenticatedLayout from '@/AdminLayouts/AuthenticatedLayout';

export default function SurveyGraphs({ auth, survey, survey_responses }) {
    const renderGraph = (question) => {
        if (!Array.isArray(survey_responses)) {
            console.error('survey_responses is not an array:', survey_responses);
            return <p className="text-gray-600">No responses available for this question.</p>;
        }
    
        // Filtrer les réponses pour la question spécifique
        const questionResponses = survey_responses.filter(response => response.question_id === question.id);
    
        if (questionResponses.length === 0) {
            return <p className="text-gray-600">No responses available for this question.</p>;
        }
    
        // Compter le nombre de réponses pour chaque option
        const responseCounts = questionResponses.reduce((counts, response) => {
            let answer;
            try {
                answer = JSON.parse(response.response); // Essayer de parser la réponse
            } catch (e) {
                console.error('Error parsing response:', response.response, e);
                answer = response.response; // En cas d'erreur, utiliser la réponse brute
            }
            
            if (Array.isArray(answer)) {
                answer.forEach(ans => {
                    counts[ans] = (counts[ans] || 0) + 1;
                });
            } else {
                counts[answer] = (counts[answer] || 0) + 1;
            }
            return counts;
        }, {});
    
        // Préparer les données pour le graphique circulaire
        const data = {
            labels: Object.keys(responseCounts), // Les options de réponse
            datasets: [{
                label: 'Number of Responses',
                data: Object.values(responseCounts), // Nombre de réponses pour chaque option
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            }],
        };
    
        // Options du graphique
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        };
    
        return <Pie data={data} options={options} />;
    };
    

    const renderTextResponses = (question) => {
        const questionResponses = survey_responses.filter(response => response.question_id === question.id);
        if (questionResponses.length === 0) {
            return <p className="text-gray-600">No responses available for this question.</p>;
        }

        return (
            <ul className="list-disc pl-5 text-gray-800">
                {questionResponses.map((response, index) => (
                    <li key={index} className="mb-2">{response.response}</li>
                ))}
            </ul>
        );
    };

    return (
        <AuthenticatedLayout user={auth.admin}>
            <Head title="Survey Graphs">
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
             <div className="min-h-screen py-12 bg-black bg-opacity-50" > <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="p-6 text-gray-900">
                            <a href="/admin/results" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-transform duration-200 ease-in-out inline-flex items-center mb-8 text-black-500 hover:text-black-700 ">    
                                Back to Results
                            </a>
                            <h1 className="text-3xl font-bold text-white mb-8">Survey Graphs for : {survey.title}</h1>
                            {survey.questions.map((question, index) => (
                                <div key={question.id} className=" bg-opacity-70 bg-gray-200 rounded-lg p-6 mb-3 shadow-lg" style={{ height: '400px' }}>
                                    <h2 className="text-2xl font-semibold text-gray-800">{index + 1}. {question.text}</h2>
                                    {question.type === 'multiple-choice' || question.type === 'one-choice' ? (
                                        renderGraph(question)
                                    ) : question.type === 'text' ? (
                                        renderTextResponses(question)
                                    ) : (
                                        <p className="text-gray-600">This question type does not support graph visualization.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
