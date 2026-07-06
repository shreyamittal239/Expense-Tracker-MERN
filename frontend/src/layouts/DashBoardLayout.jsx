import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                {children}

            </div>

        </div>
    );
};

export default DashboardLayout;