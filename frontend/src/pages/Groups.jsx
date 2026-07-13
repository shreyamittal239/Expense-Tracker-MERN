import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardLayout from "../layouts/DashBoardLayout";
import api from "../services/api";

const Groups = () => {

    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);

    const [groupName, setGroupName] = useState("");

    const [description, setDescription] = useState("");

    const fetchGroups = async () => {

        try {

            const response = await api.get("/groups");

            setGroups(response.data.groups);

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const createGroup = async () => {

        if (!groupName) return;

        try {

            await api.post("/groups", {
                name: groupName,
                description,
            });

            setGroupName("");
            setDescription("");

            fetchGroups();

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    useEffect(() => {

        fetchGroups();

    }, []);

    return (

        <DashBoardLayout>

            <div className="max-w-5xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    My Groups
                </h1>

                <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Create New Group
                    </h2>

                    <input
                        type="text"
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) =>
                            setGroupName(e.target.value)
                        }
                        className="border p-3 rounded-lg w-full mb-4"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        className="border p-3 rounded-lg w-full mb-4"
                    />

                    <button
                        onClick={createGroup}
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
                    >
                        Create Group
                    </button>

                </div>

                <div className="space-y-5">

                    {groups.map((group) => (

                        <div
                            key={group._id}
                            className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
                        >

                            <div>

                                <h2 className="text-xl font-bold">
                                    {group.name}
                                </h2>

                                <p className="text-gray-500">
                                    {group.description}
                                </p>

                                <p className="text-sm text-gray-400 mt-2">
                                    Members : {group.members.length}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/groups/${group._id}`)
                                }
                                className="bg-green-600 text-white px-5 py-2 rounded-lg"
                            >
                                Open
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </DashBoardLayout>

    );

};

export default Groups;