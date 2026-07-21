import { Link } from "react-router-dom";

const AuthFooter = ({
    question,
    linkText,
    linkTo,
}) => {
    return (
        <div className="mt-8">

            <div className="text-center">

                <p className="text-sm text-slate-500">

                    {question}{" "}

                    <Link
                        to={linkTo}
                        className="
                            font-semibold
                            text-indigo-600
                            hover:text-indigo-700
                            transition
                        "
                    >
                        {linkText}
                    </Link>

                </p>

            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">

                <p className="text-center text-xs text-slate-400 leading-6">

                    By continuing, you agree to our{" "}

                    <button className="text-indigo-600 hover:underline">
                        Terms of Service
                    </button>

                    {" "}and{" "}

                    <button className="text-indigo-600 hover:underline">
                        Privacy Policy
                    </button>

                </p>

                <p className="text-center text-xs text-slate-400 mt-4">

                    © {new Date().getFullYear()} SpendWise AI.
                    All rights reserved.

                </p>

            </div>

        </div>
    );
};

export default AuthFooter;