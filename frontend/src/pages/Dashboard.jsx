import React from 'react'
import DashboardLayout from '../layouts/DashBoardLayout'
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
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
    <DashboardLayout>
        
        <div className="p-6">
      <div>

    <h1 className="text-4xl font-bold">
        Welcome back, {user?.name} 👋
    </h1>

    <p className="text-gray-500 mt-2">
        Here's an overview of your expenses.
    </p>

</div>
      
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

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

 <h2 className="text-2xl font-bold mt-10 mb-5 ">
    Recent Expenses
        </h2>

        <div className="bg-white shadow rounded-lg p-5">

    {
        dashboardData?.recentExpenses?.length > 0 ? (

            dashboardData.recentExpenses.map((expense) => (

                <div
                    key={expense._id}
                    className="flex justify-between items-center border-b py-3"
                >

                    <div>

                        <h3 className="font-semibold">
                            {expense.title}
                        </h3>

                        <p className="text-gray-500 text-sm">
                            {expense.category}
                        </p>

                        <p className="text-gray-500 text-sm">
    {new Date(expense.date).toLocaleDateString()}
</p>

                    </div>

                    <div className="text-right">

                        <p className="font-bold text-red-500">
                            ₹ {expense.amount}
                        </p>

                    </div>

                </div>

            ))

        ) : (

            <p>No expenses found.</p>

        )
    }

    <button
    onClick={() => navigate("/add-expense")}
    className="bg-blue-600 text-white px-5 py-2 rounded mb-5 my-10"
>
    Add Expense
</button>

</div>
       
 </DashboardLayout>
  )
}

export default Dashboard;