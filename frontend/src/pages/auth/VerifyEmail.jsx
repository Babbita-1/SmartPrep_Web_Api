import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const handleVerify = async () => {
        try {
            await api.post('/auth/verify-email', { email, code });
            setMessage({ text: 'Email verified successfully! Redirecting...', type: 'success' });
            setTimeout(() => navigate('/sign-in'), 2000);
        } catch (error) {
            setMessage({ text: 'Invalid verification code. Try again.', type: 'error' });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
                {message && <p className={`text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
                <input type="email" value={email} disabled className="w-full px-4 py-2 rounded-lg bg-gray-200" />
                <input type="text" placeholder="Verification Code" onChange={(e) => setCode(e.target.value)} required className="w-full px-4 py-2 rounded-lg border mt-4" />
                <button onClick={handleVerify} className="w-full bg-green-600 text-white py-2 rounded-lg mt-4">Verify</button>
            </div>
        </div>
    );
};

export default VerifyEmail;
