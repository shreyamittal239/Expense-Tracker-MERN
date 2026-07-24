import { Bell } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const NotificationBell = ({ onClick }) => {

    const { notifications } = useNotification();

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (

        <button
            onClick={onClick}
            className="relative   p-2 rounded-full hover:bg-gray-100 transition"
        >
            

            <Bell size={22} />

            {unreadCount > 0 && (

                <span
                    className="absolute -top-1 -right-1
                    bg-red-500 text-white
                    rounded-full
                    w-5 h-5
                    flex items-center justify-center
                    text-xs"
                >
                    {unreadCount}
                </span>

                

            )}

            <div
    className={`p-4 border-b transition

    ${
        notifications.read
            ? "bg-white"
            : "bg-indigo-50"
    }`}
></div>

        </button>

    );

};

export default NotificationBell;