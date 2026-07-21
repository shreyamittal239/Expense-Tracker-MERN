import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <Link
            to="/forgot-password"
            className="
                text-sm
                font-medium
                text-indigo-600
                hover:text-indigo-700
                transition
            "
        >
            Forgot Password?
        </Link>
    );
};

export default ForgotPassword;