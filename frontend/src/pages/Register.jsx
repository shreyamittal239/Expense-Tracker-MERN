import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import AuthLayout from "../layouts/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthFooter from "../components/auth/AuthFooter";
// import AuthDivider from "../components/auth/AuthDivider";
// import SocialLoginButton from "../components/auth/SocialLoginButton";

const Register = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/auth/register", formData);

            navigate("/login");

        } catch (error) {

            console.log(error.response?.data);

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout leftContent={<AuthBranding />}>

            <AuthCard>

                <AuthHeader
                    title="Create Your Account 🚀"
                    subtitle="Start your financial journey with AI-powered expense tracking."
                />

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <AuthInput
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        icon={<FaUser />}
                        required
                    />

                    <AuthInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<FaEnvelope />}
                        required
                    />

                    <AuthInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={<FaLock />}
                        required
                    />

                    <AuthButton
                        type="submit"
                        loading={loading}
                    >
                        Create Account
                    </AuthButton>

                </form>

                {/*
                Uncomment later

                <AuthDivider text="OR CONTINUE WITH" />

                <SocialLoginButton />
                */}

                <AuthFooter
                    question="Already have an account?"
                    linkText="Sign In"
                    linkTo="/login"
                />

            </AuthCard>

        </AuthLayout>

    );

};

export default Register;