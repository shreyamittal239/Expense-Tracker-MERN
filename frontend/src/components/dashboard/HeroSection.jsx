import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

import {
    ArrowRight,
    Sparkles,
    Plus,
} from "lucide-react";

const HeroSection = ({ dashboardData }) => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";

    return (

        <section
            className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-r
            from-indigo-600
            via-violet-600
            to-purple-700
            text-white
            p-10
            shadow-2xl
            "
        >

            {/* Decorative circles */}

            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10"></div>

            <div className="absolute bottom-0 right-32 w-40 h-40 rounded-full bg-white/5"></div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">

                {/* Left */}

                <div>

                    <div className="flex items-center gap-2 mb-4">

                        <Sparkles size={18} />

                        <span className="text-indigo-100">

                            SpendWise AI Dashboard

                        </span>

                    </div>

                    <h1 className="text-5xl font-bold leading-tight">

                        {greeting},

                        <br />

                        {user?.name} 👋

                    </h1>

                    <p className="text-indigo-100 mt-5 text-lg leading-8 max-w-xl">

                        Welcome back to SpendWise AI.

                        Manage your expenses, split bills effortlessly,
                        and receive intelligent financial insights powered
                        by AI.

                    </p>

                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={() => navigate("/add-expense")}
                            className="
                            bg-white
                            text-indigo-700
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            hover:scale-105
                            transition
                            flex
                            items-center
                            gap-2
                            "
                        >

                            <Plus size={18} />

                            Add Expense

                        </button>

                        <button
                            onClick={() => navigate("/ai")}
                            className="
                            border
                            border-white/30
                            bg-white/10
                            backdrop-blur-lg
                            px-6
                            py-3
                            rounded-xl
                            hover:bg-white/20
                            transition
                            flex
                            items-center
                            gap-2
                            "
                        >

                            Ask AI

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </div>

                {/* Right */}

                <div className="flex justify-end">

                    <div
                        className="
                        bg-white/10
                        backdrop-blur-xl
                        rounded-3xl
                        p-8
                        border
                        border-white/20
                        w-80
                        "
                    >

                        <p className="text-indigo-100">

                            Total Expenses

                        </p>

                        <h2 className="text-5xl font-bold mt-2">

                            ₹{dashboardData?.totalExpense || 0}

                        </h2>

                        <div className="mt-8 space-y-4">

                            <div className="flex justify-between">

                                <span className="text-indigo-100">

                                    Transactions

                                </span>

                                <span>

                                    {dashboardData?.totalTransactions || 0}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-indigo-100">

                                    Categories

                                </span>

                                <span>
                         
                              {dashboardData?.categoryCount || 0}
                                  

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default HeroSection;