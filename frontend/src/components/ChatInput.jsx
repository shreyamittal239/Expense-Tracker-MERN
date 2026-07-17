import { useState } from "react";

const ChatInput = ({ onSend, loading }) => {

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!message.trim()) return;

        onSend(message);

        setMessage("");

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-3 mt-5"
        >

            <input
                type="text"
                placeholder="Ask about your expenses..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl disabled:opacity-50"
            >

                {loading ? "Sending..." : "Send"}

            </button>

        </form>

    );

};

export default ChatInput;