import React from 'react';
import AuthenticatedLayout from '@/AdminLayouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function NewSurvey({ auth }) {
    const { data, setData, post, processing } = useForm({
        title: '',
        description: '',
        questions: [{ id: uuidv4(), text: '', type: 'text', options: [] }],
    });

    const addQuestion = () => {
        setData('questions', [
            ...data.questions,
            { id: uuidv4(), text: '', type: 'text', options: [] },
        ]);
    };

    const handleQuestionChange = (id, key, value) => {
        setData('questions', data.questions.map((question) =>
            question.id === id ? { ...question, [key]: value } : question
        ));
    };

    const handleTypeChange = (id, type) => {
        setData('questions', data.questions.map((question) =>
            question.id === id ? { ...question, type: type, options: [] } : question
        ));
    };

    const handleAddOption = (id) => {
        setData('questions', data.questions.map((question) =>
            question.id === id
                ? { ...question, options: [...question.options, ''] }
                : question
        ));
    };

    const handleOptionChange = (questionId, optionIndex, value) => {
        setData('questions', data.questions.map((question) =>
            question.id === questionId
                ? {
                    ...question,
                    options: question.options.map((option, index) =>
                        index === optionIndex ? value : option
                    ),
                }
                : question
        ));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.surveys.store'));
    };

    const renderQuestion = (question, index) => {
        return (
            <div key={question.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question-${index}`}>
                    Question {index + 1}
                </label>
                <input
                    type="text"
                    id={`question-${index}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                    placeholder="Enter question"
                    required
                />
                <div className="mt-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Type of Response
                    </label>
                    <select
                        value={question.type}
                        onChange={(e) => handleTypeChange(question.id, e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="text">Text</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="one-choice">One Choice</option>
                        <option value="list">Dropdown List</option>
                    </select>
                </div>
                {(question.type === 'multiple-choice' || question.type === 'one-choice' || question.type === 'list') && (
                    <div>
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="relative mb-2 mt-1">
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={option}
                                    onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    required
                                />
                                {question.options.length > 1 && (
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleOptionChange(question.id, optionIndex, '')}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="flex items-center text-green-600 hover:text-green-800 mt-2"
                            onClick={() => handleAddOption(question.id)}
                        >
                            <FaPlus className="mr-2" /> Add Option
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.admin}
            //header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Survey</h2>}
        >
            <Head title="New Survey">
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-6">Create New Survey</h1>
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formTitle">
                                        Form Title
                                    </label>
                                    <input
                                        type="text"
                                        id="formTitle"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter form title"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formDescription">
                                        Form Description
                                    </label>
                                    <textarea
                                        id="formDescription"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter form description"
                                        required
                                    />
                                </div>
                                {data.questions.map((question, index) => renderQuestion(question, index))}
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                                        onClick={addQuestion}
                                    >
                                        <FaPlus className="mr-2" /> Add Question
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                                        disabled={processing}
                                    >
                                        {processing ? 'Creating...' : 'Create Survey'}
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
