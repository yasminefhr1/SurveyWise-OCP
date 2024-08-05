import React, { useEffect, useState } from 'react';
import SurveyResponses from './SurveyResponses';

export default function SurveyResponsesPage({ surveyId }) {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        fetch(`/api/surveys/${surveyId}/responses`)
            .then(response => response.json())
            .then(data => setResponses(data))
            .catch(error => console.error('Error fetching responses:', error));
    }, [surveyId]);

    return (
        <SurveyResponses responses={responses} />
    );
}
