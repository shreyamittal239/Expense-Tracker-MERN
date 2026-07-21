import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import api from "../services/api";

import AuthLayout from "../layouts/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthFooter from "../components/auth/AuthFooter";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            const { data } = await api.post(
                "/auth/forgot-password",
                { email }
            );

            setSuccess(data.message);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout leftContent={<AuthBranding />}>

          

            <AuthCard>

                <AuthHeader
                    title="Forgot Password"
                    subtitle="Enter your registered email address and we'll send you a secure password reset link."
                />

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 mt-8"
                >

                    <AuthInput
                        type="email"
                        icon={<FaEnvelope />}
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    {success && (

                        <div className="bg-green-100 border border-green-300 text-green-700 rounded-xl p-3 text-sm">

                            {success}

                        </div>

                    )}

                    {error && (

                        <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-3 text-sm">

                            {error}

                        </div>

                    )}

                    <AuthButton
                        type="submit"
                        loading={loading}
                    >

                        Send Reset Link

                    </AuthButton>

                </form>

                <AuthFooter>

                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >

                        ← Back to Login

                    </button>

                </AuthFooter>

            </AuthCard>

        </AuthLayout>

    );

};

export default ForgotPasswordPage;