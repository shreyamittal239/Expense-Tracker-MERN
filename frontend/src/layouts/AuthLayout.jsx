import GradientBackground from "../components/auth/GradientBackground";

const AuthLayout = ({ leftContent, children }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">

            <GradientBackground />

            <div className="relative z-10 min-h-screen">

                <div className="grid lg:grid-cols-2 min-h-screen">

                    {/* Left Section */}

                    <div className="hidden lg:flex items-center justify-center px-20">

                        {leftContent}

                    </div>

                    {/* Right Section */}

                    <div className="flex items-center justify-center px-6 py-12">

                        {children}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;