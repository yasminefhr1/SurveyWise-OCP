import { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [step, setStep] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    useEffect(() => {
        const texts = [
            "Welcome to Admin Registration. Please click 'Start' to begin.",
            "Please provide your Name:",
            "Now, enter your Email:",
            "Create a Password:",
            "Confirm your Password:",
        ];

        if (step < texts.length) {
            const text = texts[step];
            let index = 0;
            const interval = setInterval(() => {
                setTypingText(text.substring(0, index + 1));
                index++;
                if (index >= text.length) {
                    clearInterval(interval);
                }
            }, 50); // Vitesse de saisie simulée
        }
    }, [step]);

    useEffect(() => {
        validateStep();
    }, [data, step]);

    const validateStep = () => {
        switch (step) {
            case 1:
                setIsValid(data.name.trim() !== '');
                break;
            case 2:
                setIsValid(data.email.trim() !== '');
                break;
            case 3:
                setIsValid(data.password.trim() !== '');
                break;
            case 4:
                setIsValid(data.password === data.password_confirmation);
                break;
            default:
                setIsValid(true);
                break;
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.register'), {
            onSuccess: () => {
                // Ajoutez une redirection côté client si nécessaire
                window.location.href = '/admin/dashboard';
            }
        });
    };
    

    const nextStep = () => {
        if (isValid) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const renderStepContent = () => {
        return (
            <div style={styles.chatContainer}>
                {step > 0 && (
                    <div style={{ ...styles.chatBubble, ...styles.chatBubbleUser }}>
                        <p>
                            {step === 1 && `Name: ${data.name}`}
                            {step === 2 && `Email: ${data.email}`}
                            {step === 3 && `Password: ••••••••`}
                            {step === 4 && `Confirm Password: ••••••••`}
                        </p>
                    </div>
                )}

                {step < 5 && (
                    <div style={{ ...styles.chatBubble, ...styles.chatBubbleSystem }}>
                        <p>{typingText}</p>
                    </div>
                )}

                {step > 0 && (
                    <div style={styles.inputContainer}>
                        {step === 1 && (
                            <>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </>
                        )}

                        <div style={styles.buttonContainer}>
                        <PrimaryButton
                            onClick={step === 4 ? submit : nextStep}
                            disabled={!isValid}
                            className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {step === 4 ? "Register" : "Next"}
                        </PrimaryButton>
                        </div>
                    </div>
                )}

                {step === 0 && (
                    <div style={styles.buttonContainer}>
                        <PrimaryButton
                            onClick={nextStep}
                            className="px-6 py-3 bg-black-600 text-white hover:bg-blue-700 items-center justify-center "
                        >
                            Start
                        </PrimaryButton>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url("/logo/jorf-lasfar-ocp.png")' }}
        >
            <GuestLayout>
                <Head title="Register" />
                <h1 style={styles.title}>Admin Register</h1>
                <form onSubmit={submit}>
                    {renderStepContent()}
                </form>
            </GuestLayout>
        </div>
    );
}

const styles = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: '500px',
        width: '100%',
        margin: '0 auto',
    },
    chatBubble: {
        padding: '10px 15px',
        borderRadius: '15px',
        margin: '10px 0',
        maxWidth: '80%',
        lineHeight: '1.4',
    },
    chatBubbleUser: {
        alignSelf: 'flex-end',
        backgroundColor: '#f1f1f1',
        color: '#333',
    },
    chatBubbleSystem: {
        backgroundColor: '#007bff',
        color: '#fff',
        alignSelf: 'flex-start',
    },
    inputContainer: {
        marginTop: '10px',
        width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    title: {
        fontSize: '30px',
        marginBottom: '20px',
        textAlign: 'center',
    },
};
