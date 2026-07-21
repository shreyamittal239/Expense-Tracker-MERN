import { useNavigate } from "react-router-dom";

import {
    Utensils,
    ShoppingBag,
    Car,
    Home,
    Film,
    Wallet,
    ArrowRight,
} from "lucide-react";

const RecentExpenses = ({ expenses = [] }) => {

    const navigate = useNavigate();

    const categoryIcons = {

        Food: Utensils,
        Shopping: ShoppingBag,
        Transport: Car,
        Rent: Home,
        Entertainment: Film,

    };

    const categoryColors = {

        Food: "bg-green-100 text-green-700",
        Shopping: "bg-purple-100 text-purple-700",
        Transport: "bg-blue-100 text-blue-700",
        Rent: "bg-orange-100 text-orange-700",
        Entertainment: "bg-pink-100 text-pink-700",

    };

    return (

        <div
            className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            border
            border-white
            shadow-sm
            "
        >

            {/* Header */}

            <div className="flex justify-between items-center p-6 border-b">

                <div>

                    <h2 className="text-2xl font-bold">

                        Recent Expenses

                    </h2>

                    <p className="text-gray-500">

                        Your latest transactions

                    </p>

                </div>

                <button
                    onClick={() => navigate("/expenses")}
                    className="
                    flex
                    items-center
                    gap-2
                    text-indigo-600
                    font-semibold
                    hover:gap-3
                    transition-all
                    "
                >

                    View All

                    <ArrowRight size={18}/>

                </button>

            </div>

            {/* Expenses */}

            <div>

                {

                    expenses.length > 0 ?

                    expenses.map((expense) => {

                        const Icon =
                            categoryIcons[expense.category] || Wallet;

                        const badge =
                            categoryColors[expense.category] ||
                            "bg-gray-100 text-gray-700";

                        return (

                            <div
                                key={expense._id}
                                className="
                                flex
                                justify-between
                                items-center
                                p-6
                                border-b
                                last:border-none
                                hover:bg-gray-50
                                transition
                                "
                            >

                                <div className="flex items-center gap-5">

                                    <div
                                        className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-indigo-100
                                        flex
                                        items-center
                                        justify-center
                                        "
                                    >

                                        <Icon
                                            className="text-indigo-600"
                                            size={24}
                                        />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-lg">

                                            {expense.title}

                                        </h3>

                                        <p className="text-sm text-gray-500">

                                            {new Date(
                                                expense.date
                                            ).toLocaleDateString()}

                                        </p>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <h3 className="text-xl font-bold text-red-500">

                                        ₹{expense.amount}

                                    </h3>

                                    <span
                                        className={`
                                        inline-block
                                        mt-2
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-semibold
                                        ${badge}
                                        `}
                                    >

                                        {expense.category}

                                    </span>

                                </div>

                            </div>

                        );

                    })

                    :

                    <div className="py-16 text-center">

                        <Wallet
                            size={40}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-4 text-lg font-semibold">

                            No Expenses Yet

                        </h3>

                        <p className="text-gray-500 mt-2">

                            Add your first expense to start tracking your spending.

                        </p>

                    </div>

                }

            </div>

        </div>

    );

};

export default RecentExpenses;