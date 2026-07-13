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

const GroupDetails = () => {

    const { id } = useParams();

    const [group, setGroup] = useState(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {

        fetchGroup();

    }, []);

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

                    </div>

                    <div className="text-center py-16">

                        <h3 className="text-xl font-semibold text-gray-700">

                            No Shared Expenses Yet

                        </h3>

                        <p className="text-gray-500 mt-2">

                            Shared expenses will appear here once
                            group members start adding them.

                        </p>

                    </div>

                </div>

            </div>

        </DashBoardLayout>

    );

};

export default GroupDetails;