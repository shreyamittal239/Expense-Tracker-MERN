import { FcGoogle } from "react-icons/fc";

const SocialLoginButton = () => {
    return (
        <button
            className="
                w-full
                h-14
                rounded-2xl
                border
                border-slate-200
                bg-white
                hover:bg-slate-50
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-3
                font-semibold
                text-slate-700
                shadow-sm
            "
        >
            <FcGoogle size={24} />

            Continue with Google
        </button>
    );
};

export default SocialLoginButton;