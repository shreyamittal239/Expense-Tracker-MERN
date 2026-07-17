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
import AIInsightsCard from "../components/AIInsightsCard";
import FloatingAIButton from "../components/FloatingAIButton";

const Dashboard = () => {

    const [budget , setBudget ] = useState(null);
    const [totalSpent, setTotalSpent] = useState(0);
    const [remaining, setRemaining] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [budgetAmount , setBudgetAmount] = useState("");

    const navigate = useNavigate();

    const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
});

    const fetchBudget = async () => {
    try {
        const response = await api.get("/budget");

        setBudget(response.data.budget);
        setTotalSpent(response.data.totalSpent);
        setRemaining(response.data.remaining);
        setPercentage(response.data.percentage);

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

                     <div className="max-w-6xl mx-auto p-8">

        <AIInsightsCard />

        {/* Existing Dashboard Cards */}

    </div>

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
    
      
    </div>
          
          {/* Monthly Budget */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <div className="flex justify-between items-center mb-6">

        <div>
            <h2 className="text-2xl font-bold">
                Monthly Budget ({currentMonth})
            </h2>

            <p className="text-gray-500">
                Track your monthly spending goal.
            </p>
        </div>

    </div>

    {/* Budget Input */}

    <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
            type="number"
            placeholder="Enter Monthly Budget"
            value={budgetAmount}
            onChange={(e) =>
                setBudgetAmount(e.target.value)
            }
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
            onClick={saveBudget}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
            Save Budget
        </button>

    </div>

    {budget ? (

        <>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                <div className="bg-green-50 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500">
                        Monthly Budget
                    </p>

                    <h3 className="text-3xl font-bold text-green-600 mt-2">
                        ₹{budget.amount}
                    </h3>

                </div>

                <div className="bg-red-50 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500">
                        Total Spent
                    </p>

                    <h3 className="text-3xl font-bold text-red-500 mt-2">
                        ₹{totalSpent}
                    </h3>

                </div>

                <div className="bg-blue-50 rounded-xl p-5 shadow-sm">

                    <p className="text-gray-500">
                        Remaining
                    </p>

                    <h3
                        className={`text-3xl font-bold mt-2 ${
                            remaining >= 0
                                ? "text-blue-600"
                                : "text-red-600"
                        }`}
                    >
                        ₹{remaining}
                    </h3>

                </div>

            </div>

            {/* Progress */}

            <div>

                <div className="flex justify-between mb-2">

                    <span className="font-medium">
                        Budget Usage
                    </span>

                    <span className="font-semibold">
                        {Number(percentage || 0).toFixed(1)}%
                    </span>

                </div>

                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                    <div
                        className={`h-full transition-all duration-700 ${
                            percentage < 70
                                ? "bg-green-500"
                                : percentage < 100
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{
                            width: `${Math.min(
                                Number(percentage || 0),
                                100
                            )}%`,
                        }}
                    />

                </div>

                <p className="mt-3 text-gray-500">

                    You have used{" "}

                    <span className="font-semibold">

                        {Number(percentage || 0).toFixed(1)}%

                    </span>{" "}

                    of your monthly budget.

                </p>

            </div>

            {/* Warning */}

            {remaining < 0 && (

                <div className="mt-6 bg-red-100 border border-red-400 rounded-xl p-4">

                    <h4 className="font-bold text-red-700">
                        Budget Exceeded ⚠
                    </h4>

                    <p className="text-red-600 mt-1">
                        You have exceeded your monthly budget.
                        Try reducing your spending.
                    </p>

                </div>

            )}

        </>

    ) : (

        <div className="bg-gray-50 rounded-xl p-8 text-center">

            <h3 className="text-xl font-semibold">
                No Budget Set
            </h3>

            <p className="text-gray-500 mt-2">
                Enter your monthly budget above to start tracking your spending.
            </p>

        </div>

    )}

</div>
                
            <div>
                {/* Pie Chart */}

                {dashboardData?.categoryWiseExpense?.length > 0 && (

                    <div className="mt-8">

                        <ExpensePieChart
                            data={dashboardData.categoryWiseExpense}
                        />

                    </div>

                )} 

    {/* Recent Expenses */}

<div className="mt-10">

    <div className="flex justify-between items-center mb-6">

        <div>

            <h2 className="text-3xl font-bold text-gray-800">
                Recent Expenses
            </h2>

            <p className="text-gray-500 mt-1">
                Your latest recorded transactions
            </p>

        </div>

    </div>

    {dashboardData?.recentExpenses?.length > 0 ? (

        <div className="space-y-5">

            {dashboardData.recentExpenses.map((expense) => (

                <div
                    key={expense._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex justify-between items-center"
                >

                    {/* Left Side */}

                    <div className="flex items-center gap-5">

                        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">

                            💸

                        </div>

                        <div>

                            <h3 className="text-lg font-bold text-gray-800">

                                {expense.title}

                            </h3>

                            <div className="flex items-center gap-3 mt-2">

                                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">

                                    {expense.category}

                                </span>

                                <span className="text-gray-400 text-sm">

                                    📅{" "}

                                    {new Date(expense.date).toLocaleDateString()}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="text-right">

                        <p className="text-2xl font-bold text-red-500">

                            ₹{expense.amount}

                        </p>

                        <p className="text-sm text-gray-500">

                            Expense

                        </p>

                    </div>

                </div>

            ))}

        </div>

    ) : (

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-4">

                📭

            </div>

            <h3 className="text-xl font-bold text-gray-700">

                No Recent Expenses

            </h3>

            <p className="text-gray-500 mt-2">

                Start adding expenses to view your latest transactions here.

            </p>

        </div>

    )}

</div>
</div>
             <FloatingAIButton />

        </DashBoardLayout>

  )
}

export default Dashboard;