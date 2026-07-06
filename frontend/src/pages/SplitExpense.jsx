import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashBoardLayout'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SplitExpense = () => {

  const [title , setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [ participants , setParticipants] = useState([""]);

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

     const filteredParticipants = participants.filter(
        (participant) => participant.trim() !== ""
    );

    try {

        await api.post("/splitExpenses", {
            title,
            totalAmount,
            participants:filterParticipants,
        });
        console.log({
    title,
    totalAmount,
    participants,
});

        navigate("/dashboard");

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
    </DashboardLayout>
  );
  };


export default SplitExpense