import {
    Wallet,
    Users,
    Bot,
    Receipt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatsCards = ({ dashboardData }) => {
    const navigate = useNavigate();

    const cards = [

        {
            title: "Total Expenses",
            value: `₹${dashboardData?.totalExpense || 0}`,
            subtitle: "Overall spending",
            icon: Wallet,
            bg: "from-indigo-500 to-violet-600",
        },

        {
            title: "Transactions",
            value: dashboardData?.totalTransactions || 0,
            subtitle: "Total transactions",
            icon: Receipt,
            bg: "from-cyan-500 to-blue-600",
        },

        {
            title: "Groups",
            value: dashboardData?.totalGroups || 0,
            subtitle: "Shared expense groups",
            icon: Users,
            bg: "from-green-500 to-emerald-600",
        },

        {
            title: "AI Assistant",
            value: "Ready",
            subtitle: "Ask financial questions",
            icon: Bot,
             path: "/ai",
            bg: "from-pink-500 to-purple-600",
        },

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (

                    <div
                        key={index}
                         onClick={() => card.path && navigate(card.path)}
                        className={`
                        group
                        bg-white/80
                        backdrop-blur-xl
                        border
                        border-white
                        rounded-3xl
                        p-6
                        shadow-sm
                        hover:shadow-xl
                        hover:-translate-y-2
                        transition-all
                        duration-300
                         ${
                      card.path
                      ? "cursor-pointer"
                        : ""
                     }
                        `}
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-500 text-sm">

                                    {card.title}

                                </p>

                                <h2 className="text-4xl font-bold text-gray-800 mt-3">

                                    {card.value}

                                </h2>

                                <p className="text-gray-400 mt-4">

                                    {card.subtitle}

                                </p>

                            </div>

                            <div
                                className={`
                                w-16
                                h-16
                                rounded-2xl
                                bg-gradient-to-r
                                ${card.bg}
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                group-hover:rotate-6
                                transition
                                `}
                            >

                                <Icon
                                    className="text-white"
                                    size={28}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default StatsCards;