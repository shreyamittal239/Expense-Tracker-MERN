import React from 'react'
import DashBoardLayout from '../layouts/DashBoardLayout'
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ExpensePieChart from '../components/ExpensePieChart';
import {
    FaWallet,
    FaReceipt,
    FaTags
} from "react-icons/fa";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    console.log(user);

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

         const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard");
            console.log(response.data);

            setDashboardData(response.data);

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    fetchDashboard();
    } , []);

  return (
     <DashBoardLayout>

            <div className="p-6">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Welcome back, {user?.name} 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Here's an overview of your expenses.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/add-expense")}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                    >
                        <FaPlus />
                        Add Expense
                    </button>

                </div>

                {/* Dashboard Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <DashboardCard
                        title="Total Expense"
                        value={`₹${dashboardData?.totalExpense || 0}`}
                        icon={<FaWallet />}
                        color="text-green-500"
                    />

                    <DashboardCard
                        title="Transactions"
                        value={dashboardData?.totalTransactions || 0}
                        icon={<FaReceipt />}
                        color="text-blue-500"
                    />

                    <DashboardCard
                        title="Categories"
                        value={dashboardData?.categoryWiseExpense?.length || 0}
                        icon={<FaTags />}
                        color="text-purple-500"
                    />

                </div>

                {/* Pie Chart */}

                {dashboardData?.categoryWiseExpense?.length > 0 && (

                    <div className="mt-8">

                        <ExpensePieChart
                            data={dashboardData.categoryWiseExpense}
                        />

                    </div>

                )}

                {/* Recent Expenses */}

                <h2 className="text-2xl font-bold mt-10 mb-5">
                    Recent Expenses
                </h2>

                <div className="bg-white shadow-lg rounded-2xl p-5">

                    {dashboardData?.recentExpenses?.length > 0 ? (

                        dashboardData.recentExpenses.map((expense) => (

                            <div
                                key={expense._id}
                                className="flex justify-between items-center border-b last:border-none py-4"
                            >

                                <div>

                                    <h3 className="font-semibold text-lg">
                                        {expense.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm">
                                        {expense.category}
                                    </p>

                                    <p className="text-gray-400 text-xs">
                                        {new Date(expense.date).toLocaleDateString()}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-red-500 font-bold text-lg">
                                        ₹{expense.amount}
                                    </p>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="text-center py-10 text-gray-500">

                            No recent expenses found.

                        </div>

                    )}

                </div>

            </div>

        </DashBoardLayout>

  )
}

export default Dashboard;