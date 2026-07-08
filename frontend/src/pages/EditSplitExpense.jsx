import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api';
import DashboardLayout from '../layouts/DashBoardLayout';

const EditSplitExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();

     const [data , setData] = useState({
        title:"",
        totalAmount:"",
        participants:[]
    })

   

    const addParticipant =() => {
        setData({...data ,
            participants:[
                ...data.participants,
                {name: "" , share:0}
            ]
        })
    }
   
    const removeParticipant = (index) => {
   const updatedParticipants = data.participants.filter (
    (_ , i) => i !== index
   );

   setData ({
    ...data,
    participants:updatedParticipants
   })
}

   const handleParticipantChange = (index , value) => {
   const updatedParticipants = [...data.participants];
   updatedParticipants[index].name  = value;
   
   setData({
    ...data,
    participants:updatedParticipants
   })
 }
 
    const fetchExpenses = async () => {
        try {

        const response = await api.get(`/splitExpenses/${id}`)
        setData(response.data.splitExpense);

        } catch(error) {
            console.log(error.response?.data);
        }
    }

    const handleSubmit= async (e) =>{
        e.preventDefault();
        const updatedParticipants = data.participants.map((participant) => ({
    name: participant.name,
    share: Number(data.totalAmount) / data.participants.length,
}));

        try {
         await api.put(`/splitExpenses/${id}` ,{...data, participants:updatedParticipants })
         navigate("/split-expense")
        }
         catch(error) {
            console.log(error.response?.data)

        }
    }

    useEffect(()=>{
     fetchExpenses();
    }, [])
  return (
     <DashboardLayout>

        <h1 className="text-3xl font-bold mb-6">
            Edit Split Expense
            </h1>

            <form 
            onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded shadow">
           
           <input
                    type="text"
                    value={data.title}
                    onChange={(e) =>
                        setData({
                            ...data,
                            title: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="number"
                    value={data.totalAmount}
                    onChange={(e) =>
                        setData({
                            ...data,
                            totalAmount: e.target.value,
                        })
                    }
                    className="w-full border p-3 rounded"
                />

               {data.participants.map((participant, index) => (

    <div
        key={index}
        className="flex gap-3 mb-4"
    >

        <input
            type="text"
            value={participant.name}
            onChange={(e) =>
                handleParticipantChange(
                    index,
                    e.target.value
                )
            }
           
        />
        
      


        {data.participants.length > 1 && (

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
<div className="flex justify-center gap-3">

  <button
    type="button"
    onClick={addParticipant}
    className="bg-blue-600 text-white px-5 py-3 rounded-xl mb-8"
>
    + Add Participant
</button>

<button type="submit"
 className="bg-green-600 text-white px-5 py-3 rounded-xl mb-8">
Save Changes
</button>

</div>
            </form>


     </DashboardLayout>
   
  )
}

export default EditSplitExpense