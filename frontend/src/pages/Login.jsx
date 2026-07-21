import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import AuthContext from "../context/AuthProvider";

import AuthLayout from "../layouts/AuthLayout";
import AuthBranding from "../components/auth/AuthBranding";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthDivider from "../components/auth/AuthDivider";
import AuthFooter from "../components/auth/AuthFooter";
import RememberMe from "../components/auth/RememberMe";
import ForgotPassword from "../components/auth/ForgotPassword";
// import SocialLoginButton from "../components/auth/SocialLoginButton";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const [formData, setFormData] = useState({
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

            await login(formData);

            navigate("/dashboard");

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
                    title="Welcome Back 👋"
                    subtitle="Sign in to continue managing your finances with SpendWise AI."
                />

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={<FaLock />}
                        required
                    />

                    <div className="flex items-center justify-between">

                        <RememberMe
                            checked={rememberMe}
                            onChange={() =>
                                setRememberMe(!rememberMe)
                            }
                        />

                        <ForgotPassword />

                    </div>

                    <AuthButton
                        type="submit"
                        loading={loading}
                    >
                        Sign In
                    </AuthButton>

                </form>

                {/* Uncomment later when Google OAuth is implemented */}

                {/*

                <AuthDivider text="OR CONTINUE WITH" />

                <SocialLoginButton />

                */}

                <AuthFooter
                    question="Don't have an account?"
                    linkText="Create Account"
                    linkTo="/register"
                />

            </AuthCard>

        </AuthLayout>

    );

};

export default Login;