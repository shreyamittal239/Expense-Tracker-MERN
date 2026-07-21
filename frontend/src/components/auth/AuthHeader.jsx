import { motion } from "framer-motion";

const AuthHeader = ({
    title,
    subtitle,
    badge = "SpendWise AI",
}) => {
    return (
        <div className="mb-10">

            {/* Badge */}

            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-indigo-50
                    border
                    border-indigo-100
                    text-indigo-700
                    text-sm
                    font-semibold
                "
            >
                ✨ {badge}
            </motion.div>

            {/* Heading */}

            <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="
                    mt-6
                    text-4xl
                    font-extrabold
                    tracking-tight
                    text-slate-900
                "
            >
                {title}
            </motion.h1>

            {/* Subtitle */}

            <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="
                    mt-3
                    text-slate-500
                    leading-7
                    text-base
                "
            >
                {subtitle}
            </motion.p>

        </div>
    );
};

export default AuthHeader;