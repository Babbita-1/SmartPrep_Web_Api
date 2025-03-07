import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

//signup
const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        academicLevel: '',
        role: 'student' // Default role is students
    });
    const [modal, setModal] = useState({ open: false, message: '', type: '' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If selecting admin, disable academicLevel
        if (name === 'role' && value === 'admin') {
            setFormData({ ...formData, role: value, academicLevel: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', {
                ...formData,
                academicLevel: formData.role === 'admin' ? null : Number(formData.academicLevel)
            });
            setModal({ open: true, message: 'Registration successful! You can now log in.', type: 'success' });

            setTimeout(() => navigate('/sign-in'), 500);
        } catch (error) {
            console.error('Signup error:', error.response?.data);
            setModal({
                open: true,
                message: error.response?.data?.error || 'Signup failed. Please try again.',
                type: 'error',
            });

            setTimeout(() => setModal({ open: false, message: '', type: '' }), 2500);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                <h2 className="text-3xl font-semibold text-white text-center mb-4">Create an Account</h2>
                <p className="text-white/80 text-center mb-6">Join us and start your journey</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={formData.name} onChange={handleChange} required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={formData.email} onChange={handleChange} required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={formData.password} onChange={handleChange} required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label className="block text-white mb-1">Role</label>
                        <select
                            name="role"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={formData.role} onChange={handleChange} required
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-white mb-1">Academic Level</label>
                        <select
                            name="academicLevel"
                            className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 focus:ring-2 focus:ring-indigo-500"
                            value={formData.academicLevel}
                            onChange={handleChange}
                            disabled={formData.role === 'admin'}
                            required={formData.role !== 'admin'}
                        >
                            <option value="" disabled>Select Academic Level</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                            <option value="13">Bachelor's</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition">
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-white">
                    Already have an account? <Link to="/sign-in" className="text-blue-300 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
