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
    FaTags,
    FaPlus
} from "react-icons/fa";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {

    const [budget , setBudget ] = useState("");
    const [budgetAmount , setBudgetAmount] = useState("");

    const navigate = useNavigate();

    const fetchBudget = async () => {
    try {
        const response = await api.get("/budget");

        setBudget(response.data.budget);

    } catch (error) {
        console.log(error.response?.data);
    }
};
    const { user } = useContext(AuthContext);
    console.log(user);

    const [dashboardData, setDashboardData] = useState(null);

    

         const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard");
            console.log(response.data);

            setDashboardData(response.data);

        } catch (error) {

            console.log(error.response?.data);

        }

    };
     const saveBudget = async () => {
    try {

        await api.post("/budget", {
            amount: budgetAmount,
        });

        fetchBudget();

        setBudgetAmount("");

    } catch (error) {

        console.log(error.response?.data);

    }
};
    

    useEffect(() => {
        fetchDashboard();
        fetchBudget();
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

                <div className="bg-white shadow-lg rounded-xl p-6 mb-6">

    <h2 className="text-2xl font-bold mb-4">
        Monthly Budget
    </h2>

    <div className="flex gap-3">

        <input
            type="number"
            placeholder="Enter Monthly Budget"
            value={budgetAmount}
            onChange={(e) =>
                setBudgetAmount(e.target.value)
            }
            className="border rounded-lg p-3 flex-1"
        />

        <button
            onClick={saveBudget}
            className="bg-blue-600 text-white px-6 rounded-lg"
        >
            Save
        </button>

    </div>

    {budget && (

        <div className="mt-5">

            <h3 className="text-xl font-bold text-green-600">

                Current Budget

            </h3>

            <p className="text-3xl font-bold">

                ₹{budget.amount}

            </p>

        </div>

    )}

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