import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaPlus
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";


const categoryColors = {
    Food: "bg-green-100 text-green-700",
    Travel: "bg-blue-100 text-blue-700",
    Shopping: "bg-purple-100 text-purple-700",
    Bills: "bg-yellow-100 text-yellow-700",
    Health: "bg-red-100 text-red-700",
    Entertainment: "bg-pink-100 text-pink-700",
    Education: "bg-indigo-100 text-indigo-700",
    Other: "bg-gray-100 text-gray-700",
};

const Expenses = () => {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [search , setSearch] = useState("");
    const [category , setCategory] = useState("All");

    const fetchExpenses = async () => {

        try {

            const response = await api.get("/expenses");

            setExpenses(response.data.expenses);

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    useEffect(() => {

        fetchExpenses();

    }, []);

    const deleteExpense = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/expenses/${id}`);

            fetchExpenses();

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const filteredExpenses = expenses.filter((expense) => {

        const matchedSearch =
        expense.title 
         ?.toLowerCase()
         .includes(search.toLowerCase());

         const matchedCategory =
         category === "All" || 
         expense.category === category;

         return matchedSearch && matchedCategory;
 } )

    return (

        <DashboardLayout>

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                <div>

                    <h1 className="text-4xl font-bold">
                        My Expenses
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Track and manage all your expenses.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/add-expense")}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                    <FaPlus />
                    Add Expense
                </button>

            </div>

            {/* Search + Filter */}

            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <input
                    type="text"
                    placeholder="🔍 Search Expenses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <select
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                    className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                >
                    <option>All Categories</option>
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Health</option>
                    <option>Entertainment</option>
                    <option>Education</option>
                    <option>Other</option>
                </select>

            </div>

            {/* Empty State */}

            {filteredExpenses.length === 0 ? (

                <div className="bg-white rounded-2xl shadow-lg py-20 text-center">

                    <div className="text-6xl mb-4">
                        📄
                    </div>

                    <h2 className="text-2xl font-bold">
                        No Expenses Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start tracking your expenses today.
                    </p>

                    <button
                        onClick={() => navigate("/add-expense")}
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >
                        Add Your First Expense
                    </button>

                </div>

            ) : (

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="text-left p-4">
                                    Title
                                </th>

                                <th className="text-left p-4">
                                    Category
                                </th>

                                <th className="text-left p-4">
                                    Amount
                                </th>

                                <th className="text-left p-4">
                                    Date
                                </th>

                                <th className="text-center p-4">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredExpenses.map((expense) => (

                                <tr
                                    key={expense._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >

                                    <td className="p-4 font-medium">
                                        {expense.title}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[expense.category]}`}
                                        >
                                            {expense.category}
                                        </span>

                                    </td>

                                    <td className="p-4 font-semibold text-green-600">
                                        ₹{expense.amount}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-expense/${expense._id}`
                                                    )
                                                }
                                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteExpense(
                                                        expense._id
                                                    )
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </DashboardLayout>

    );

};

export default Expenses;