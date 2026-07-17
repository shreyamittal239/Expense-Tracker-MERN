import api from "./api";

export const sendMessage = async (message) => {

    const response = await api.post("/ai/chat", {
        message,
    });

    return response.data;
};
  export const analyzeExpenses = async () => {

    const response = await api.post("/ai/analyze");

    return response.data;
};
