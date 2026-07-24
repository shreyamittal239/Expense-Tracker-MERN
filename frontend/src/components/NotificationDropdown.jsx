import { useNotification } from "../context/NotificationContext";
import { formatDistanceToNow } from "date-fns";

import {
    DollarSign,
    Bot,
    Users,
    CheckCircle,
} from "lucide-react";

const NotificationDropdown = () => {

    const { notifications } = useNotification();
    const { clearNotifications } = useNotification();
    const getIcon = (type) => {

    switch (type) {

        case "expense":
            return <DollarSign size={18} />;

        case "ai":
            return <Bot size={18} />;

        case "group":
            return <Users size={18} />;

        default:
            return <CheckCircle size={18} />;

    }

};

    return (

        <div
            className="
            absolute
            right-0
            mt-2
            w-80
            bg-white
            rounded-xl
            shadow-lg
            border
            z-50
            "
        >

            <div className="p-4 border-b font-semibold">

                Notifications

            </div>

             <button
       onClick={clearNotifications}
      className="text-sm text-red-500"
></button>


            {

                notifications.length === 0 ?

                (

                    <div className="p-4 text-gray-500">

                        No Notifications

                    </div>

                )

                :

                notifications.map((notification) => (

                    <div
                        key={notification.id}
                        className="p-4 border-b hover:bg-gray-50"
                    >
                        <div
        className={`
        flex
        gap-4
        p-4
        border-b
        transition
        hover:bg-gray-50
        cursor-pointer

        ${notification.read
            ? "bg-white"
            : "bg-indigo-50"}
    `}
>

    <div className="mt-1">

        {getIcon(notification.type)}

    </div>

    <div className="flex-1">

        <div className="flex justify-between">

            <h3 className="font-semibold">

                {notification.title}

            </h3>

            <span className="text-xs text-gray-400">

                {formatDistanceToNow(
                    new Date(notification.createdAt),
                    { addSuffix: true }
                )}

            </span>

        </div>

        <p className="text-gray-600 text-sm mt-1">

            {notification.message}

        </p>

            </div>
       </div> 

                    </div>  
                ))

            }

        </div>

    );

};

export default NotificationDropdown;