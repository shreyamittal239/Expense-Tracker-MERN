const RememberMe = ({
    checked,
    onChange,
}) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer">

            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-indigo-600
                    focus:ring-indigo-500
                "
            />

            <span className="text-sm text-slate-600">

                Remember me

            </span>

        </label>
    );
};

export default RememberMe;