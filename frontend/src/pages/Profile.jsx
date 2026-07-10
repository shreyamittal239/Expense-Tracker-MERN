import { useEffect, useState } from "react";
import api from "../services/api";
import DashBoardLayout from "../layouts/DashBoardLayout";

const Profile = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [joinedDate, setJoinedDate] = useState("");

    const fetchProfile = async () => {
        try {

            const response = await api.get("/auth/profile");

            setFormData({
                name: response.data.user.name,
                email: response.data.user.email,
            });

            setJoinedDate(
                new Date(response.data.user.createdAt).toLocaleDateString()
            );

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.put(
                "/auth/profile",
                formData
            );

            alert(response.data.message);

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    return (

        <DashBoardLayout>

            <div className="max-w-3xl mx-auto p-8">

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="flex flex-col items-center">

                        <img
                            src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff&size=150"
                            alt="profile"
                            className="w-28 h-28 rounded-full mb-4"
                        />

                        <h2 className="text-3xl font-bold">
                            My Profile
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Joined on {joinedDate}
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <div>

                            <label className="font-semibold">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <div>

                            <label className="font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 mt-2"
                            />

                        </div>

                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                        >
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>

        </DashBoardLayout>

    );

};

export default Profile;