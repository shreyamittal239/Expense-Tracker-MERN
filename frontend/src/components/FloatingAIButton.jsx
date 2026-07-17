import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const FloatingAIButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/ai")}
            className="
                fixed
                bottom-8
                right-8
                w-16
                h-16
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                shadow-2xl
                hover:scale-110
                hover:shadow-purple-400/50
                transition-all
                duration-300
                flex
                items-center
                justify-center
                z-50
            "
        >
            <FaRobot size={28} />
        </button>
    );
};

export default FloatingAIButton;