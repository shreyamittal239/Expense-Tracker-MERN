import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import NotificationBell from "./NotificationBell";
import NotificationDropdown from "./NotificationDropdown";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import {
    Search,
    Bell,
    ChevronDown,
} from "lucide-react";

const Header = () => {
    const { markAllAsRead } = useNotification();
    const [open, setOpen] = useState(false);

    const { user } = useContext(AuthContext);

    const hour = new Date().getHours();

    const handleNotificationClick = () => {

    setOpen(!open);

    if (!open) {

        markAllAsRead();

    }

};

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";

    return (

        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-gray-200">

            <div className="flex justify-between items-center px-10 py-5">

                {/* Left Section */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">

                        {greeting} 👋

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Welcome back,

                        <span className="font-semibold text-indigo-600 ml-1">

                            {user?.name}

                        </span>

                    </p>

                </div>

                {/* Right Section */}

                <div className="flex items-center gap-5">

                    {/* Search */}

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="
                            w-72
                            pl-11
                            pr-4
                            py-3
                            rounded-2xl
                            bg-white
                            border
                            border-gray-200
                            outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            transition
                            "
                        />

                    </div>

                    {/* Notifications */}

                    <div className="relative">

    <NotificationBell
        onClick={handleNotificationClick}
    />

    {

        open &&

        <NotificationDropdown />

    }

</div>

                    {/* Profile */}

    <div
    
    
    className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-2 rounded-xl transition-all"
>

    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">

        {user?.profileImage ? (

            <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full object-cover"
            />

        ) : (

            user?.name?.charAt(0).toUpperCase()

        )}

    </div>

    <div className="hidden md:block">

        <p className="font-semibold text-slate-800">
            {user?.name}
        </p>

        <p className="text-xs text-slate-500">
            View Profile
        </p>

    </div>

</div>
                </div>

            </div>

        </header>

    );

};

export default Header;