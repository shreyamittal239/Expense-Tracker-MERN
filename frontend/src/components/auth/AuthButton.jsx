import { FaSpinner } from "react-icons/fa";

const AuthButton = ({
    children,
    type = "button",
    loading = false,
    disabled = false,
    onClick,
}) => {
    return (
        <button
            type={type}
            disabled={loading || disabled}
            onClick={onClick}
            className={`
                w-full
                h-14
                rounded-2xl
                font-semibold
                text-white
                text-lg
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-purple-600
                shadow-lg
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-2xl
                hover:from-indigo-700
                hover:to-purple-700
                active:scale-[0.98]
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-3
            `}
        >
            {loading ? (
                <>
                    <FaSpinner className="animate-spin" />
                    Please wait...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default AuthButton;