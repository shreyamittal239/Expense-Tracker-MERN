import { useEffect, useState } from "react";
import api from "../services/api";
import DashBoardLayout from "../layouts/DashBoardLayout";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profileImage: "",
    });

    const [joinedDate, setJoinedDate] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    // ================= Fetch Profile =================

    const fetchProfile = async () => {
        try {
            const response = await api.get("/auth/profile");

            setFormData({
                name: response.data.user.name,
                email: response.data.user.email,
                profileImage: response.data.user.profileImage || "",
            });

            setJoinedDate(
                new Date(response.data.user.createdAt).toLocaleDateString()
            );
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ================= Input Change =================

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ================= Save Profile =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put("/auth/profile", formData);

            alert(response.data.message);

            fetchProfile();
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    // ================= Upload Image =================

    const uploadImage = async () => {
        console.log("Upload Button Clicked");
        console.log("Selected Image:", selectedImage);

        if (!selectedImage) {
            alert("Please select an image first.");
            return;
        }

        try {
            const imageData = new FormData();

            imageData.append("profileImage", selectedImage);

            console.log("Sending upload request...");

            const response = await api.put(
                "/auth/upload-profile",
                imageData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);

            alert(response.data.message);

            fetchProfile();

            setSelectedImage(null);

        } catch (error) {
            console.log(error);
            console.log(error.response?.data);

            alert(error.response?.data?.message || "Image upload failed");
        }
    };

    // ================= UI =================

    return (
        <DashBoardLayout>
            <div className="max-w-3xl mx-auto p-8">

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="flex flex-col items-center">

                        <img
                            src={
                                formData.profileImage
                                    ? formData.profileImage
                                    : `https://ui-avatars.com/api/?name=${formData.name}&background=2563eb&color=fff`
                            }
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                        />

                        <h2 className="text-3xl font-bold mt-4">
                            My Profile
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Joined on {joinedDate}
                        </p>

                        <div className="mt-6 flex flex-col items-center gap-4">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    console.log("Selected File:", file);

                                    setSelectedImage(file);
                                }}
                            />

                            <button
                                type="button"
                                onClick={uploadImage}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                            >
                                Upload Photo
                            </button>

                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-10 space-y-5"
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
                            type="submit"
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