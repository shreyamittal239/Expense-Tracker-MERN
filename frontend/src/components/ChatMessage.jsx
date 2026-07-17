const ChatMessage = ({ sender, message }) => {

    const isUser = sender === "user";

    return (

        <div
            className={`flex ${
                isUser ? "justify-end" : "justify-start"
            } mb-4`}
        >

            <div
                className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-md ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                }`}
            >

                <p className="text-sm whitespace-pre-wrap">

                    {message}

                </p>

            </div>

        </div>

    );

};

export default ChatMessage;