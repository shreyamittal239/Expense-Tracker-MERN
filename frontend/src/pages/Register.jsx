import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaWallet, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await api.post("/auth/register", formData);

        navigate("/login");

    } catch (error) {

        console.log(error.response?.data);

    }

};

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

            {/* Logo */}
            <div className="flex justify-center mb-4">
                <div className="bg-green-500 p-4 rounded-full">
                    <FaWallet className="text-white text-3xl" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center">
                Create Account
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
                Join Expense Tracker and manage your finances effortlessly.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Name */}

                <div className="relative">

                    <FaUser className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-200"
                    />

                </div>

                {/* Email */}

                <div className="relative">

                    <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-200"
                    />

                </div>

                {/* Password */}

                <div className="relative">

                    <FaLock className="absolute left-4 top-4 text-gray-400" />

                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-green-200"
                    />

                </div>

                {/* Register Button */}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 text-white py-3 rounded-xl font-semibold"
                >
                    Create Account
                </button>

            </form>

            <p className="text-center mt-6 text-gray-600">

                Already have an account?

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="ml-2 text-green-600 hover:underline font-semibold"
                >
                    Login
                </button>

            </p>

            <p className="text-center text-sm text-gray-400 mt-8">
                © 2026 Expense Tracker
            </p>

        </div>

    </div>
    );
};

export default Register;