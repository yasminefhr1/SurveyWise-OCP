import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { FaUser, FaLock, FaTrashAlt } from 'react-icons/fa'; // Import des icônes

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
           // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
            <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/logo/home.gif')" }}>
             <div className="min-h-screen py-12 bg-black bg-opacity-50" > 
           
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white bg-opacity-80 shadow sm:rounded-lg flex items-start space-x-4">
                        <FaUser className="text-gray-600 text-2xl" /> {/* Icône de profil */}
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white bg-opacity-80 shadow sm:rounded-lg flex items-start space-x-4">
                        <FaLock className="text-gray-600 text-2xl" /> {/* Icône de mot de passe */}
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white bg-opacity-80 shadow sm:rounded-lg flex items-start space-x-4">
                        <FaTrashAlt className="text-gray-600 text-2xl" /> {/* Icône de suppression */}
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
                </div></div>
        </AuthenticatedLayout>
    );
}
