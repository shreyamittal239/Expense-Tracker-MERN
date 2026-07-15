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
         
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">

    <div>

        <h1 className="text-4xl font-bold text-gray-800">

            👥 My Groups

        </h1>

        <p className="text-gray-500 mt-2">

            Manage all your shared expense groups in one place.

        </p>

    </div>
            
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

{groups.map(group=>(

<div
key={group._id}
className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1"
>

<div className="flex justify-between">

<div>

<h2 className="text-2xl font-bold">

🏖 {group.name}

</h2>

<p className="text-gray-500 mt-2">

{group.description}

</p>

</div>

<div>

<span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">

Group

</span>

</div>

</div>

<div className="border-t my-6"></div>

<div className="space-y-3">

<div className="flex justify-between">

<span className="text-gray-500">

👥 Members

</span>

<span className="font-bold">

{group.members.length}

</span>

</div>

<div className="flex justify-between">

<span className="text-gray-500">

📅 Created

</span>

<span>

{new Date(group.createdAt).toLocaleDateString()}

</span>

</div>

</div>

<button

onClick={()=>navigate(`/groups/${group._id}`)}

className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"

>

View Group →

</button>

</div>

))}

</div>

                   

            

        </DashBoardLayout>

    );

};

export default Groups;