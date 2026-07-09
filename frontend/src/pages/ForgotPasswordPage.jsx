import React, { useState } from "react";
import api from "../services/api";

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/auth/forgot-password", {
                email,
            });

            alert(response.data.message);

        } catch (error) {

            alert(error.response?.data?.message);

        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >

                <h1 className="text-3xl font-bold mb-2">
                    Forgot Password
                </h1>

                <p className="text-gray-500 mb-6">
                    Enter your registered email to receive a password reset link.
                </p>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-6"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                    Send Reset Link
                </button>

            </form>

        </div>
    );
};

export default ForgotPasswordPage;