import React, { useEffect,useRef, useState } from 'react'
import DashboardLayout from '../layouts/DashBoardLayout'
import { FaTrash } from 'react-icons/fa';
import api from '../services/api';

const SplitExpense = () => {
  

  const [title , setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [ participants , setParticipants] = useState([""]);
  const [splitExpenses , setSplitExpenses] = useState([]);
  const historyRef = useRef(null);

 const addParticipant =() => {
  setParticipants([...participants, ""]);
 }

 const handleParticipantChange = (index , value) => {
   const updatedParticipants = [...participants];
   updatedParticipants[index] = value;
   setParticipants(updatedParticipants);
 }

 const removeParticipant = (index) => {
   const updatedParticipants = participants.filter (
    (_ , i) => i !== index
   );

   setParticipants(updatedParticipants);
 }

 const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("button clicked");

     const filteredParticipants = participants.filter(
        (participant) => participant.trim() !== ""
    );

    try {
     if (!title || !totalAmount || filteredParticipants.length === 0) {
    alert("Please fill all fields");
    return;
}

        await api.post("/splitExpenses", {
            title,
            totalAmount,
            participants:filteredParticipants,
        });
       

      await  fetchExpenses();   // Refresh history
             resetForm(); 
             historyRef.current?.scrollIntoView({
             behavior: "smooth",
});

    } catch (error) {

        console.log(error.response?.data);

    }

   
};

 const fetchExpenses = async () => {

            try {
                const response = await api.get("/splitExpenses")
                console.log(response.data)
                setSplitExpenses(response.data.splitExpenses);
            }
            catch(error) {
                console.log(error.response?.data);

            }
           
        }

 useEffect(() => {

        fetchExpenses();
    } ,[])

    const resetForm = () => {
    setTitle("");
    setTotalAmount("");
    setParticipants([""]);
};

 const deleteExpense = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/splitExpenses/${id}`);

            fetchExpenses();

        } catch (error) {

            console.log(error.response?.data);

        }

    };



  return (
    <DashboardLayout>

      <form onSubmit={handleSubmit}>
          <div className="min-h-screen bg-slate-100">
      
               
               <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

    <h1 className="text-3xl font-bold mb-2">
        Split Expense
    </h1>

    <p className="text-gray-500 mb-8">
        Split bills equally among participants.
    </p>
      
      <div className="mb-5">

    <label className="block mb-2 font-medium">
        Expense Title
    </label>

    <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-xl p-3"
        placeholder="Dinner, Trip, Party..."
    />

</div>

<div className="mb-6">

    <label className="block mb-2 font-medium">
        Total Amount
    </label>

    <input
        type="number"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
        className="w-full border rounded-xl p-3"
        placeholder="Enter total amount"
    />

</div>

{participants.map((participant, index) => (

    <div
        key={index}
        className="flex gap-3 mb-4"
    >

        <input
            type="text"
            value={participant}
            onChange={(e) =>
                handleParticipantChange(
                    index,
                    e.target.value
                )
            }
            className="flex-1 border rounded-xl p-3"
            placeholder={`Participant ${index + 1}`}
        />

        {participants.length > 1 && (

            <button
                type="button"
                onClick={() => removeParticipant(index)}
                className="bg-red-500 text-white px-4 rounded-xl"
            >
                Remove
            </button>

        )}

    </div>

))}

<button
    type="button"
    onClick={addParticipant}
    className="bg-blue-600 text-white px-5 py-3 rounded-xl mb-8"
>
    + Add Participant
</button>


<div className="bg-gray-100 rounded-xl p-5 mb-6">

    <h2 className="font-bold text-lg mb-2">
        Split Preview
    </h2>

    <p>

        Each Person Pays :

        <span className="font-bold text-green-600 ml-2">

            ₹
            {
                participants.length > 0
                    ? (
                        Number(totalAmount || 0) /
                        participants.length
                    ).toFixed(2)
                    : 0
            }

        </span>

    </p>

</div>


<button
    type="submit" 
    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
>
    Save Split Expense
</button>

    </div>

    </div>

    </form>

    {/* Split Expense History */}
<div ref={historyRef}>
<h2 className="text-2xl font-bold mt-10 mb-5">
    Split Expense History
</h2>
</div>

{splitExpenses.length === 0 ? (

    <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <p className="text-gray-500 text-lg">
            No Split Expenses Found
        </p>
    </div>

) : (

    <div className="space-y-6">

        {splitExpenses.map((expense) => (

            <div
                key={expense._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >

                {/* Expense Header */}

                <div className="flex justify-between items-center mb-4">

                    <div>

                        <h3 className="text-xl font-bold">
                            {expense.title}
                        </h3>

                        <p className="text-gray-500">
                            Total Amount
                        </p>

                    </div>

                    <div className="text-green-600 font-bold text-xl">
                        ₹{expense.totalAmount
                        .toFixed(2)}
                        
                    </div>

                </div>

                {/* Participants */}

                <div className="border-t pt-4">

                    <h4 className="font-semibold mb-3">
                        Participants
                    </h4>

                    {expense.participants.map((participant, index) => (

                        <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b last:border-none"
                        >

                            <span className="font-medium">
                                {participant.name}
                            </span>

                            <span className="text-blue-600 font-semibold">
                                ₹{participant.share}
                            </span>

                        </div>

                    ))}

                     </div>

            <div className="flex justify-end mt-5">

    <button
        onClick={() => deleteExpense(expense._id)}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
    >
        <FaTrash />
        Delete
    </button>

     <button
        onClick={() => navigate(`/edit-split-expense/${expense._id}`) }
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
    >
        <FaTrash />
        Edit
    </button>

   </div>

                </div>

           

        ))}
     
    
    </div>

)}

    
    </DashboardLayout>
  );
  };


export default SplitExpense