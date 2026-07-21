import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthInput = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    icon,
    name,
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type;

    return (
        <div className="space-y-2">

            <label className="block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <div
                className="
                    relative
                    group
                "
            >
                {/* Left Icon */}

                {icon && (
                    <div
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            group-focus-within:text-indigo-600
                            transition
                        "
                    >
                        {icon}
                    </div>
                )}

                {/* Input */}

                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        py-4
                        pl-12
                        pr-12
                        text-slate-800
                        placeholder:text-slate-400
                        outline-none
                        transition-all
                        duration-300
                        focus:border-indigo-500
                        focus:ring-4
                        focus:ring-indigo-100
                        shadow-sm
                    "
                />

                {/* Password Toggle */}

                {type === "password" && (

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            hover:text-indigo-600
                            transition
                        "
                    >
                        {showPassword ? (
                            <FaEyeSlash />
                        ) : (
                            <FaEye />
                        )}
                    </button>

                )}

            </div>

        </div>
    );
};

export default AuthInput;