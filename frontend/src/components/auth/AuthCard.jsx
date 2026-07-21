const AuthCard = ({ title, subtitle, children, footer }) => {
    return (
        <div
            className="
                w-full
                max-w-md
                bg-white/80
                backdrop-blur-2xl
                border
                border-white/60
                rounded-3xl
                shadow-2xl
                p-10
            "
        >
           {children}
        </div>
    );
};

export default AuthCard;