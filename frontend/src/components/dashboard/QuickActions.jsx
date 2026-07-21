import { useNavigate } from "react-router-dom";

import {
    Plus,
    Users,
    Bot,
    ReceiptText,
    ArrowRight,
} from "lucide-react";

const QuickActions = () => {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Add Expense",
            description: "Record a new expense",
            icon: Plus,
            color: "from-indigo-500 to-violet-600",
            path: "/add-expense",
        },

        {
            title: "Create Group",
            description: "Split expenses with friends",
            icon: Users,
            color: "from-green-500 to-emerald-600",
            path: "/groups",
        },

        {
            title: "Ask SpendWise AI",
            description: "Get AI financial insights",
            icon: Bot,
            color: "from-purple-500 to-pink-600",
            path: "/ai",
        },

        {
            title: "View Expenses",
            description: "Browse all transactions",
            icon: ReceiptText,
            color: "from-cyan-500 to-blue-600",
            path: "/expenses",
        },

    ];

    return (

        <div className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            border
            border-white
            shadow-sm
            p-6
            h-full
        ">

            <h2 className="text-2xl font-bold text-gray-800">

                Quick Actions

            </h2>

            <p className="text-gray-500 mt-1">

                Jump to the features you use most.

            </p>

            <div className="space-y-4 mt-8">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (

                        <button
                            key={action.title}
                            onClick={() => navigate(action.path)}
                            className="
                            w-full
                            flex
                            items-center
                            justify-between
                            p-4
                            rounded-2xl
                            hover:bg-gray-50
                            transition-all
                            duration-300
                            group
                            border
                            border-transparent
                            hover:border-gray-200
                            "
                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    bg-gradient-to-r
                                    ${action.color}
                                    flex
                                    items-center
                                    justify-center
                                    shadow-md
                                    `}
                                >

                                    <Icon
                                        className="text-white"
                                        size={22}
                                    />

                                </div>

                                <div className="text-left">

                                    <h3 className="font-semibold text-gray-800">

                                        {action.title}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {action.description}

                                    </p>

                                </div>

                            </div>

                            <ArrowRight
                                size={18}
                                className="
                                text-gray-400
                                group-hover:translate-x-1
                                transition
                                "
                            />

                        </button>

                    );

                })}

            </div>

        </div>

    );

};

export default QuickActions;