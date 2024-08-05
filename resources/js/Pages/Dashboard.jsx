import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaStar, FaTasks, FaHistory } from 'react-icons/fa'; // Importation des icônes

export default function Dashboard({ auth }) {
    const cards = [
        {
            title: 'Give Your Opinion',
            description: 'Participate in surveys and provide your feedback.',
            link: '/surveys',
            bgColor: 'bg-purple-300',
            icon: <FaStar className="text-white text-3xl" />, // Icône
            features: [
                'Participate in various surveys',
                'Share your valuable feedback',
                'Impact future decisions'
            ]
        },
        {
            title: 'View All Surveys',
            description: 'Browse all the available surveys you can participate in.',
            link: '/surveys',
            bgColor: 'bg-green-300',
            icon: <FaTasks className="text-white text-3xl" />, // Icône
            features: [
                'Browse a list of surveys',
                'Filter by category or topic',
                'Find surveys of interest'
            ]
        },
        {
            title: 'Survey History',
            description: 'View the surveys you have already participated in.',
            link: '/history',
            bgColor: 'bg-yellow-300',
            icon: <FaHistory className="text-white text-3xl" />, // Icône
            features: [
                'Check your participation history',
                'Review past survey responses',
                'Track your engagement over time'
            ]
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="User Dashboard">
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Nunito', sans-serif;
                    background-color: #f5f5f5;
                }
                .bg-cover {
                    background-size: cover;
                    background-position: center;
                }
                .card {
                    transition: transform 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease;
                    border-radius: 20px;
                    width: 350px;
                    height: 350px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                    position: relative;
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 1s ease-out forwards;
                }
                .card-show {
                    opacity: 1;
                    transform: translateY(0);
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .card:hover {
                    transform: scale(1.05) rotate(0.5deg);
                    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
                }
                .card-content {
                    color: white;
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                    background-color: rgba(0, 0, 0, 0.5); /* Cadre transparent pour le texte */
                    padding: 20px;
                    border-radius: 15px;
                    text-align: left;
                }
                .card-title {
                    font-size: 1.5rem; /* Taille du titre réduite */
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                .card-description {
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                }
                .learn-more {
                    color: white;
                    background-color: transparent;
                    border: 2px solid white;
                    padding: 5px 10px;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 0.875rem; /* Petit texte */
                    border-radius: 5px;
                    transition: background-color 0.3s, color 0.3s;
                }
                .learn-more:hover {
                    background-color: white;
                    color: black;
                }
                .features {
                    font-size: 0.95rem;
                }
                .features li {
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                }
                .features li::before {
                    content: '•';
                    margin-right: 10px;
                    color: white;
                }
                .welcome-text {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #fff;
                    text-align: center;
                }
            `}</style>
             <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
             <div className="min-h-screen py-12 bg-black bg-opacity-50" > 
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <h1 className="text-4xl lg:text-3xl font-bold mb-20 text-gray-300 welcome-text">
                            Welcome to the User Dashboard
                        </h1>
                        <div className="flex flex-wrap justify-center gap-8">
                            {cards.map((card, index) => (
                                <div key={index} className={`card ${card.bgColor}`}>
                                    <div className="card-content">
                                        {card.icon}
                                        <h2 className="card-title">{card.title}</h2>
                                        <p className="card-description">{card.description}</p>
                                        <ul className="features">
                                            {card.features.map((feature, featureIndex) => (
                                                <li key={featureIndex}>{feature}</li>
                                            ))}
                                        </ul>
                                        <Link href={card.link} className="learn-more">
                                            Learn More
                                        </Link>
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
