import React, { useState } from 'react'
import DashboardLayout from '../layouts/DashBoardLayout'

const SplitExpense = () => {

  const [title , setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [ participants , setParticipants] = useState("");

 const addParticipant =() => {
  setParticipants([...participants, ""]);
 }

 const handleParticipantChange = (index , value) => {
   const updatedParticipants = [...participants];
   updatedParticipant[index] = value;
   setParticipants(updatedParticipants);
 }

 const removeParticipant = (index) => {
   const updatedParticipants = participants.filter (
    (_ , i) => i !== index
   );

   setParticipants(updatedParticipants);
 }

  return (
    <DashboardLayout>
        <h1> Dashboard Page </h1>
    </DashboardLayout>
  )
}

export default SplitExpense