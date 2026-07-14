import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashBoardLayout from "../layouts/DashBoardLayout";
import api from "../services/api";
import {
    FaUsers,
    FaEnvelope,
    FaUserPlus,
    FaReceipt,
} from "react-icons/fa";
import AddGroupExpenseModal from "../components/AddGroupExpenseModal";
import SettlementModal from "../components/SettlementModel";
import EditGroupExpense from "../components/EditGroupExpense";

const GroupDetails = () => {

    const { id } = useParams();

    const [group, setGroup] = useState(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [balances, setBalances] = useState([]);
    const [showSettlementModal, setShowSettlementModal] = useState(false);
    const [selectedSettlement, setSelectedSettlement] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [settlementHistory, setSettlementHistory] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);


    const fetchGroup = async () => {
        try {

            const response = await api.get(`/groups/${id}`);

            setGroup(response.data.group);

        } catch (error) {

            console.log(error.response?.data);

        } finally {

            setLoading(false);

        }
    };

    const addMember = async () => {

        if (!email) {
            return alert("Please enter an email.");
        }

        try {

            const response = await api.post(
                `/groups/${id}/add-member`,
                {
                    email,
                }
            );

            alert(response.data.message);

            setEmail("");

            fetchGroup();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const deleteExpense = async (expenseId) => {

         const confirmDelete = window.confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {

        const response = await api.delete(
            `/group-expenses/${expenseId}`
        );

        alert(response.data.message);

        fetchExpenses();

        fetchBalances();

    } catch (error) {

        alert(error.response?.data?.message);

    }

};

    const fetchExpenses = async () => {

    try {

        const response = await api.get(
            `/group-expenses/${id}`
        );

        setExpenses(response.data.expenses);

    } catch (error) {

        console.log(error.response?.data);

    }

};
const fetchBalances = async () => {

    try {

        const response = await api.get(
            `/group-expenses/balances/${id}`
        );

        setBalances(response.data.settlements);

    } catch (error) {

        console.log(error.response?.data);

    }

};

const openSettlementModal = (item) => {

    setSelectedSettlement(item);

    setShowSettlementModal(true);

};

const openEditModal = (expense) => {

    setEditingExpense(expense);

    setIsEditOpen(true);

};

const fetchSettlementHistory = async () => {

    try {

        const response = await api.get(
            `/settlements/${id}`
        );

        setSettlementHistory(response.data.settlements);

    } catch (error) {

        console.log(error);

    }

};

const closeEditModal = () => {

    setEditingExpense(null);

    setIsEditOpen(false);

};

    useEffect(() => {

        fetchGroup();
        fetchExpenses();
        fetchBalances();
        fetchSettlementHistory();

    }, [id]);

    if (loading) {
        return (
            <DashBoardLayout>
                <div className="text-center mt-20 text-xl font-semibold">
                    Loading Group...
                </div>
            </DashBoardLayout>
        );
    }

    if (!group) {
        return (
            <DashBoardLayout>
                <div className="text-center mt-20 text-red-500">
                    Group not found.
                </div>
            </DashBoardLayout>
        );
    }

    return (

        <DashBoardLayout>

            <div className="max-w-6xl mx-auto p-8">

                {/* Group Header */}

                <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">

                    <div className="flex justify-between items-center">

                        <div>

                            <h1 className="text-4xl font-bold">
                                {group.name}
                            </h1>

                            <p className="text-gray-500 mt-3">
                                {group.description || "No description added."}
                            </p>

                            <p className="text-sm text-gray-400 mt-4">
                                Created on{" "}
                                {new Date(group.createdAt).toLocaleDateString()}
                            </p>

                        </div>

                        <div className="text-center">

                            <FaUsers
                                size={45}
                                className="mx-auto text-blue-600"
                            />

                            <p className="font-bold mt-2">
                                {group.members.length}
                            </p>

                            <p className="text-gray-500 text-sm">
                                Members
                            </p>

                        </div>

                    </div>

                </div>

                {/* Members */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                    <h2 className="text-2xl font-bold mb-6">

                        Members

                    </h2>

                    <div className="space-y-5">

                        {group.members.map((member) => (

                            <div
                                key={member._id}
                                className="flex items-center justify-between border rounded-xl p-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={
                                            member.profileImage
                                                ? member.profileImage
                                                : `https://ui-avatars.com/api/?name=${member.name}&background=2563eb&color=fff`
                                        }
                                        alt={member.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {member.name}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            {member.email}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Add Member */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                    <h2 className="text-2xl font-bold mb-6">

                        Add New Member

                    </h2>

                    <div className="flex gap-4">

                        <div className="relative flex-1">

                            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter user's email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full border rounded-lg py-3 pl-12 pr-4"
                            />

                        </div>

                        <button
                            onClick={addMember}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg flex items-center gap-2"
                        >

                            <FaUserPlus />

                            Add Member

                        </button>

                    </div>

                </div>

                {/* Shared Expenses */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <div className="flex items-center gap-3 mb-5">

                        <FaReceipt className="text-green-600 text-2xl" />

                        <h2 className="text-2xl font-bold">

                            Shared Expenses

                        </h2>

                        <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
    >

        + Add Expense

    </button>

   

                    </div>

                   {expenses.length === 0 ? (

    <div className="text-center py-10 text-gray-500">

        No expenses added yet.

    </div>

) : (

    expenses.map((expense) => (

        <div
            key={expense._id}
            className="border rounded-xl p-5 mb-4 shadow-sm"
        >

            <div className="flex justify-between">

                <div>

                    <h3 className="text-xl font-semibold">

                        {expense.title}

                    </h3>

                    <p className="text-gray-500">

                        {expense.description}

                    </p>

                </div>

                <h2 className="text-2xl font-bold text-red-500">

                    ₹{expense.amount}

                </h2>

            </div>

            <div className="mt-4">

                <p>

                    Paid by

                    <span className="font-semibold">

                        {" "}
                        {expense.paidBy.name}

                    </span>

                </p>

            </div>

            <div className="mt-3">

                <p className="font-semibold">

                    Split Between

                </p>

                <div className="flex gap-2 flex-wrap mt-2">

                    {expense.participants.map((member) => (

                        <span
                            key={member._id}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                        >

                            {member.name}

                        </span>

                    ))}
                    

                </div>

                <button
    onClick={() => openEditModal(expense)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
>
    Edit
</button>

 <button
    onClick={() => deleteExpense(expense._id)}
    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
    Delete
</button>

            </div>

        </div>

    ))

)}

                </div>

                   <div className="bg-white rounded-xl shadow-md p-6 mt-8">

    <h2 className="text-2xl font-bold mb-5">

        Group Balances

    </h2>

    {
        balances.length > 0 ?

        balances.map((item,index)=>(

            <div
                key={index}
                className="flex justify-between items-center border-b py-4"
            >

                <div>

                    <p className="font-semibold">
                        <img
                        src={item.from.profileImage}
                        className="w-10 h-10 rounded-full"
                   />
                      {item.from.name}
                        <br></br>

                        owes
                       

<img

src={item.to.profileImage}

className="w-10 h-10 rounded-full"

/>
                        {item.to.name}

                    </p>

                </div>
                

                <span className="text-red-500 font-bold">

                    ₹{item.amount.toFixed(2)}

                </span>
                
                

                <button
        onClick={() => openSettlementModal(item)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
    >
        Settle Up
    </button>

            </div>

        ))

        :

        <p className="text-gray-500">

            Everyone is settled up 🎉

        </p>

    }

</div>


<div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">

        Settlement History

    </h2>

    {
        settlementHistory.length === 0 ?

        <p>No settlements yet.</p>

        :

        settlementHistory.map((item) => (

            <div
                key={item._id}
                className="bg-white rounded-lg shadow p-4 mb-3"
            >

                <p>

                    <strong>{item.from.name}</strong>

                    paid

                    <strong> {item.to.name}</strong>

                </p>

                <p className="text-green-600 font-semibold">

                    ₹{item.amount}

                </p>

                <small>

                    {new Date(item.createdAt).toLocaleString()}

                </small>

            </div>

        ))
    }

</div>

            </div>

         

            {showModal && (

    <AddGroupExpenseModal

        group={group}

        closeModal={() => setShowModal(false)}

        refreshExpenses={fetchExpenses}
         refreshBalances={fetchBalances}

    />

)}

{
showSettlementModal && (

<SettlementModal

    settlement={selectedSettlement}

    groupId={id}

    closeModal={() => setShowSettlementModal(false)}

    refreshBalances={fetchBalances}

    refreshHistory={fetchSettlementHistory}

/>

)
}

{
    isEditOpen && (

        <EditGroupExpense

            expense={editingExpense}
             members={group.members}
            onClose={closeEditModal}

            fetchExpenses={fetchExpenses}

            fetchBalances={fetchBalances}

        />

    )
}

        </DashBoardLayout>

    );

};

export default GroupDetails;