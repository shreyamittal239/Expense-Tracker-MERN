import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = ({ children }) => {

   


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden">

                <div className="absolute top-10 left-10 w-[420px] h-[420px] rounded-full bg-indigo-300 blur-[180px] opacity-20"></div>

                <div className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full bg-purple-300 blur-[180px] opacity-20"></div>

                <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-cyan-300 blur-[180px] opacity-10"></div>

            </div>

            <div className="flex">

                {/* Sidebar */}

                <div className="fixed left-0 top-0 h-screen z-30">

                    <Sidebar />

                </div>

                {/* Main Content */}

                <div className="flex-1 ml-72">

                    <Header />

                    <main className="p-8">

                        {children}

                    </main>

                </div>

            </div>

        </div>
    );
};

export default DashboardLayout;