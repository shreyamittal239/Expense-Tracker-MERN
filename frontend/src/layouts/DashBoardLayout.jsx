import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

            {/* Background Decorations */}

            <div className="absolute inset-0 -z-10 overflow-hidden">

                {/* Top Left */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-400 opacity-20 blur-[150px]" />

                {/* Top Right */}
                <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-[150px]" />

                {/* Bottom Left */}
                <div className="absolute bottom-0 left-20 w-80 h-80 rounded-full bg-cyan-300 opacity-20 blur-[150px]" />

                {/* Bottom Right */}
                <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-pink-300 opacity-15 blur-[160px]" />

                {/* Center Glow */}
                <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-20 blur-[180px]" />

            </div>

            {/* Navbar */}

            <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm">

                <Navbar />

            </div>

            {/* Main Content */}

            <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">

                {children}

            </main>

        </div>
    );
};

export default DashboardLayout;