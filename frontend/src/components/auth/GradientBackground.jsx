const GradientBackground = () => {
    return (
        <>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100" />

            {/* Large Blob 1 */}
            <div
                className="
                    absolute
                    -top-32
                    -left-32
                    w-[420px]
                    h-[420px]
                    rounded-full
                    bg-indigo-400/20
                    blur-[120px]
                    animate-pulse
                "
            />

            {/* Large Blob 2 */}
            <div
                className="
                    absolute
                    top-1/3
                    -right-24
                    w-[360px]
                    h-[360px]
                    rounded-full
                    bg-purple-400/20
                    blur-[120px]
                    animate-pulse
                "
            />

            {/* Large Blob 3 */}
            <div
                className="
                    absolute
                    bottom-0
                    left-1/3
                    w-[320px]
                    h-[320px]
                    rounded-full
                    bg-blue-400/20
                    blur-[120px]
                    animate-pulse
                "
            />

            {/* Decorative Grid */}
            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.04]
                    [background-image:linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)]
                    [background-size:60px_60px]
                "
            />
        </>
    );
};

export default GradientBackground;