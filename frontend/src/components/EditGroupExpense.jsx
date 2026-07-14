import { useEffect, useState } from "react";
import api from "../services/api";

const EditGroupExpense = ({
    expense,
    members,
    onClose,
    fetchExpenses,
    fetchBalances,
}) => { 

    const [formData, setFormData] = useState({

    title: "",

    amount: "",

    paidBy: "",

    participants: [],

    description: "",

});

const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]: e.target.value,

    });

};

const updateExpense = async (e) => {

    e.preventDefault();

    try {

        const response = await api.put(

            `/group-expenses/${expense._id}`,

            formData

        );

        alert(response.data.message);

        await fetchExpenses();

        await fetchBalances();

        onClose();

    } catch (error) {

        alert(error.response?.data?.message);

    }

};

const handleParticipant = (id) => {

    if (formData.participants.includes(id)) {

        setFormData({

            ...formData,

            participants: formData.participants.filter(
                item => item !== id
            ),

        });

    } else {

        setFormData({

            ...formData,

            participants: [
                ...formData.participants,
                id,
            ],

        });

    }

};

useEffect(() => {

    if (expense) {

        setFormData({

            title: expense.title,

            amount: expense.amount,

            paidBy: expense.paidBy._id,

            participants: expense.participants.map(
                member => member._id
            ),

            description: expense.description,

        });

    }

}, [expense]);

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl w-[500px]">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Expense
                </h2>

                 <form onSubmit={updateExpense}>
                <input
    type="text"
    name="title"
    value={formData.title}
    onChange={handleChange}
    className="border rounded-lg w-full p-3 mb-4"
/>

<input
    type="number"
    name="amount"
    value={formData.amount}
    onChange={handleChange}
    className="border rounded-lg w-full p-3"
/>

    <select
    name="paidBy"
    value={formData.paidBy}
    onChange={handleChange}
>
    {
        members.map((member) => (

            <option
                key={member._id}
                value={member._id}
            >
                {member.name}
            </option>

        ))
    }
</select>

   {
    members.map((member) => (

        <label key={member._id}>

            <input
                type="checkbox"
                checked={formData.participants.includes(member._id)}
                onChange={() => handleParticipant(member._id)}
            />

            {member.name}

        </label>

    ))
}

<textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
/>

  <div className="flex justify-end gap-3 mt-6">

  <button

onClick={onClose}

className="bg-gray-400 text-white px-4 py-2 rounded"

>

Cancel

</button>

<button

className="bg-blue-600 text-white px-4 py-2 rounded"

>

Save

</button>

</div>

</form>


            </div>

           

        </div>

    );

};

export default EditGroupExpense;