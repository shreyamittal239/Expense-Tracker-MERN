const AuthDivider = ({ text = "OR" }) => {
    return (
        <div className="flex items-center my-8">

            <div className="flex-1 h-px bg-slate-200" />

            <span className="mx-4 text-sm font-medium text-slate-400">
                {text}
            </span>

            <div className="flex-1 h-px bg-slate-200" />

        </div>
    );
};

export default AuthDivider;