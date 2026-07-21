import {
    FaWallet,
    FaRobot,
    FaChartLine,
    FaBullseye,
} from "react-icons/fa";

const features = [
    {
        icon: <FaRobot className="text-indigo-600 text-xl" />,
        title: "AI-Powered Financial Insights",
        description:
            "Understand your spending habits with intelligent recommendations.",
    },
    {
        icon: <FaChartLine className="text-green-600 text-xl" />,
        title: "Intelligent Spending Analytics",
        description:
            "Track monthly trends and gain meaningful financial visibility.",
    },
    {
        icon: <FaBullseye className="text-purple-600 text-xl" />,
        title: "Smart Budget Planning",
        description:
            "Stay on top of your goals with personalized budgeting support.",
    },
];

const AuthBranding = () => {
    return (
        <div className="max-w-xl">

            {/* Logo */}

            <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl">

                    <FaWallet className="text-white text-3xl" />

                </div>

                <div>

                    <h1 className="text-5xl font-extrabold text-slate-900">

                        SpendWise AI

                    </h1>

                    <p className="text-slate-500 mt-1">

                        Smarter decisions. Stronger financial future.

                    </p>

                </div>

            </div>

            {/* Heading */}

            <div className="mt-12">

                <h2 className="text-4xl font-bold leading-tight text-slate-900">

                    Manage Your Finances
                    <br />

                    with Confidence.

                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">

                    SpendWise AI combines expense tracking, intelligent
                    analytics, budgeting, and AI assistance to help you make
                    informed financial decisions every day.

                </p>

            </div>

            {/* Features */}

            <div className="space-y-5 mt-12">

                {features.map((feature, index) => (

                    <div
                        key={index}
                        className="
                            bg-white/70
                            backdrop-blur-xl
                            border
                            border-white
                            rounded-2xl
                            p-5
                            shadow-lg
                            hover:-translate-y-1
                            hover:shadow-xl
                            transition-all
                            duration-300
                        "
                    >

                        <div className="flex gap-4">

                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">

                                {feature.icon}

                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-800">

                                    {feature.title}

                                </h3>

                                <p className="text-sm text-slate-500 mt-1 leading-6">

                                    {feature.description}

                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AuthBranding;