import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";

import AuthLayout from "../layouts/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthButton from "../components/auth/AuthButton";
import AuthFooter from "../components/auth/AuthFooter";

const ResetPasswordPage = () => {

    const navigate = useNavigate();

    const { token } = useParams();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {

            return setError("Passwords do not match.");

        }

        try {

            setLoading(true);

            await api.post(`/auth/reset-password/${token}`, {

                password,

            });

            setSuccess(true);

            setTimeout(() => {

                navigate("/login");

            }, 2500);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to reset password."

            );

        } finally {

            setLoading(false);

        }

    };

    if (success) {

        return (

            <AuthLayout leftContent={<AuthBranding />}>

                

                <AuthCard>

                    <div className="text-center">

                        <FaCheckCircle
                            className="mx-auto text-6xl text-green-500"
                        />

                        <h2 className="text-3xl font-bold mt-6">

                            Password Updated

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Your password has been changed successfully.

                        </p>

                        <p className="text-sm text-gray-400 mt-6">

                            Redirecting to Login...

                        </p>

                    </div>

                </AuthCard>

            </AuthLayout>

        );

    }

    return (

        <AuthLayout>

            <AuthBranding />

            <AuthCard>

                <AuthHeader
                    title="Reset Password"
                    subtitle="Create a strong password to secure your account."
                />

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 mt-8"
                >

                    {/* Password */}

                    <div className="relative">

                        <FaLock
                            className="absolute left-5 top-5 text-gray-400"
                        />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-5 top-5 text-gray-500"
                        >

                            {

                                showPassword

                                ?

                                <FaEyeSlash/>

                                :

                                <FaEye/>

                            }

                        </button>

                    </div>

                    {/* Confirm Password */}

                    <div className="relative">

                        <FaLock
                            className="absolute left-5 top-5 text-gray-400"
                        />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-5 top-5 text-gray-500"
                        >

                            {

                                showConfirmPassword

                                ?

                                <FaEyeSlash/>

                                :

                                <FaEye/>

                            }

                        </button>

                    </div>

                    {

                        error &&

                        <div className="bg-red-100 border border-red-300 text-red-600 rounded-xl p-3">

                            {error}

                        </div>

                    }

                    <AuthButton
                        type="submit"
                        loading={loading}
                    >

                        Update Password

                    </AuthButton>

                </form>

                <AuthFooter>

                    <button
                        onClick={()=>navigate("/login")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >

                        Back to Login

                    </button>

                </AuthFooter>

            </AuthCard>

        </AuthLayout>

    );

};

export default ResetPasswordPage;