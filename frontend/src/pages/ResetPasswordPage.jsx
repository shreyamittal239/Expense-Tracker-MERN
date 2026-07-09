import React from 'react'
import { useState } from 'react';
import { useNavigate , useParams } from 'react-router-dom'
import api from '../services/api';

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const {resetToken} = useParams();

    const [ password , setPassword] = useState("");
    const [ confirmPassword , setConfirmPassword] = useState("");
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }


    await api.post(
        `/auth/reset-password/${resetToken}`,
        {
            password,
            confirmPassword
        }
    );

    navigate("/login");
};

  return (
             <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Reset Password
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm password"
                            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-semibold"
                    >
                        Reset Password
                    </button>

                </form>
            </div>
        </div>
    );
};


export default ResetPasswordPage