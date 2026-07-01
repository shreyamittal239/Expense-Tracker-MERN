import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashBoardLayout from "../layouts/DashBoardLayout";
import api from "../services/api";

const EditExpense = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        note: "",
    });

    useEffect(() => {

        const fetchExpense = async () => {

            try {

                const response = await api.get(`/expenses/${id}`);

                setFormData(response.data.expense);

            } catch (error) {

                console.log(error.response?.data);

            }

        };

        fetchExpense();

    }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/expenses/${id}`, formData);

            navigate("/expenses");

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    return (

        <DashBoardLayout>

            <h1 className="text-3xl font-bold mb-6">
                Edit Expense
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded shadow"
            >

                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            amount: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            category: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                >
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Other</option>
                </select>

                <textarea
                    value={formData.note}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            note: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <button className="bg-blue-600 text-white px-5 py-3 rounded">
                    Update Expense
                </button>

            </form>

        </DashBoardLayout>

    );

};

export default EditExpense;