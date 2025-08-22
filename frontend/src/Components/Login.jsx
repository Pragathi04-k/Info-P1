import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
 // ✅ Import the background image

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, user, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', user.name);
                localStorage.setItem('userEmail', user.email);
                setTimeout(() => {
                    navigate('/agriculture-website')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            
        >
            {/* Dark overlay to make bg lighter */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Login box */}
            <div className="relative bg-black/60 backdrop-blur-lg border-2 border-green-400 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
                <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Login</h1>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label htmlFor='email' className="block text-gray-200 font-medium mb-2">Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            className="w-full px-4 py-2 border border-gray-400/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="block text-gray-200 font-medium mb-2">Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                            className="w-full px-4 py-2 border border-gray-400/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type='submit'
                        className="w-full py-2 bg-green-600/90 text-white rounded-lg shadow-md hover:bg-green-700 transition font-semibold"
                    >
                        Login
                    </button>
                    <p className="text-sm text-gray-300 text-center">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-green-400 font-semibold hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login
