import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

const ChatWindow = ({ messages , loading }) => {

    const bottomRef = useRef(null);

    useEffect(() => {

    bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });

}, [messages]);
    return (

        <div className="h-[500px] overflow-y-auto bg-gray-100 rounded-xl p-5">

            {messages.map((message, index) => (

                <ChatMessage
                    key={index}
                    sender={message.sender}
                    message={message.message}
                />

            ))}
           

              {
    loading && (

        <div className="flex justify-start">

            <div className="bg-white shadow rounded-xl px-5 py-3">

                🤖 AI is thinking...

            </div>

        </div>

    )
}
 <div ref={bottomRef}></div>

        </div>
      

    );

};

export default ChatWindow;