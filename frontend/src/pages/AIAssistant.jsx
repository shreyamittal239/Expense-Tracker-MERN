import { useState } from "react";

import DashboardLayout from '../layouts/DashBoardLayout'
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import { sendMessage } from "../services/aiService";

const AIAssistant = () => {


    const [messages, setMessages] = useState([
        {
            sender: "ai",
            message:
                "Hello! I'm your AI Financial Assistant. Ask me anything about your expenses, spending habits, or savings.",
        },
    ]);

    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (userMessage) => {

        // Add user's message immediately
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                message: userMessage,
            },
        ]);

        try {

            setLoading(true);

            const response = await sendMessage(userMessage);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    message: response.reply,
                },
            ]);

        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    message:
                        "Something went wrong while contacting the AI.",
                },
            ]);

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto py-8">

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h1 className="text-3xl font-bold mb-2">

                        AI Financial Assistant

                    </h1>

                    <p className="text-gray-500 mb-6">

                        Ask anything about your expenses, spending habits,
                        savings, or financial insights.

                    </p>

                    <ChatWindow messages={messages} />

                    <ChatInput
                        onSend={handleSendMessage}
                        loading={loading}
                    />

                </div>

            </div>

        </DashboardLayout>

    );

};

export default AIAssistant;