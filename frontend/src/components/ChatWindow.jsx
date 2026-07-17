import ChatMessage from "./ChatMessage";

const ChatWindow = ({ messages }) => {

    return (

        <div className="h-[500px] overflow-y-auto bg-gray-100 rounded-xl p-5">

            {messages.map((message, index) => (

                <ChatMessage
                    key={index}
                    sender={message.sender}
                    message={message.message}
                />

            ))}

        </div>

    );

};

export default ChatWindow;