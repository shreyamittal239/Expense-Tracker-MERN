import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
    FaPlusCircle,
    FaMoneyBillWave,
    FaTag,
    FaCalendarAlt,
    FaStickyNote
} from "react-icons/fa";

const AddExpense = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        note: "",
        date:"",
    });

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};
    const handleSubmit = async (e) => {

        e.preventDefault();

    setLoading(true);

        try {

            await api.post("/expenses/addExpense", formData);

            navigate("/dashboard");

        } catch (error) {

            console.log(error.response?.data);

        } finally {

        setLoading(false);

    }

    };

    return (
       <DashBoardLayout>

<div className="max-w-2xl mx-auto">

    <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
            Add Expense
        </h1>

        <p className="text-gray-500 mb-8">
            Record your daily expenses easily.
        </p>

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* Fields go here */}
            <div>

    <label className="block font-medium mb-2">
        Title
    </label>

    <div className="relative">

        <FaPlusCircle
            className="absolute left-4 top-4 text-gray-400"
        />

        <input
            type="text"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            name="title"
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

    </div>

</div>

<div>

    <label className="block font-medium mb-2">
        Amount
    </label>

    <div className="relative">

        <FaMoneyBillWave
            className="absolute left-4 top-4 text-gray-400"
        />

        <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

    </div>

</div>

<div>

    <label className="block font-medium mb-2">
        Category
    </label>

    <div className="relative">

        <FaTag
            className="absolute left-4 top-4 text-gray-400"
        />

        <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        >

            <option value="">Select Category</option>
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

</div>

<div>

    <label className="block font-medium mb-2">
        Date
    </label>

    <div className="relative">

        <FaCalendarAlt
            className="absolute left-4 top-4 text-gray-400"
        />

        <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

    </div>

</div>

<div>

    <label className="block font-medium mb-2">
        Note
    </label>

    <div className="relative">

        <FaStickyNote
            className="absolute left-4 top-4 text-gray-400"
        />

        <textarea
            rows="4"
            name="note"
            placeholder="Write a short note..."
            value={formData.note}
            onChange={handleChange}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none resize-none"
        />

    </div>

</div>


<button
    type="submit"
    className="w-full bg-green-600 hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 text-white py-3 rounded-xl font-semibold"
>
    Save Expense
</button>
        </form>

    </div>

</div>

</DashBoardLayout>
        

    );
};

export default AddExpense;