import api from "./api"; // adjust if your axios instance has a different name

export const getDashboardData = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};