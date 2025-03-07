import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import api from '../../services/api';

//login
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal] = useState({ open: false, message: '', type: '' });
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            setAuth(response.data.user);
            localStorage.setItem('authToken', response.data.token);

            setModal({ open: true, message: 'Login successful! Redirecting...', type: 'success' });

            setTimeout(() => {
                if (response.data.user.role === 'admin') {
                    navigate('/admin/dashboard'); // Redirect Admins
                } else {
                    navigate('/dashboard'); // Redirect Student
                }
            }, 500);
        } catch (error) {
            setModal({ open: true, message: error.response?.data?.error || 'Login failed', type: 'error' });
            setTimeout(() => setModal({ open: false }), 3000);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                <h2 className="text-3xl font-semibold text-white text-center mb-4">Welcome Back 👋</h2>
                <p className="text-white/80 text-center mb-6">Login to continue your journey</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-white">
                    Don't have an account? <Link to="/sign-up" className="text-blue-300 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
