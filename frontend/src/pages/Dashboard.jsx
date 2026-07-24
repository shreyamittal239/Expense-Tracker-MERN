import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import {useNotification} from "../context/NotificationContext";
import HeroSection from "../components/dashboard/HeroSection";
import StatsCards from "../components/dashboard/StatsCards";
import SpendingChart from "../components/dashboard/SpendingChart";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import QuickActions from "../components/dashboard/QuickActions";
import FloatingAIButton from "../components/dashboard/FloatingAIButton";

import { getDashboardData } from "../services/dashboardService";

const Dashboard = () => {
    const { notifications } = useNotification();
    console.log("Notifications in Dashboard:", notifications);

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {

        try {

            const response = await getDashboardData();

            setDashboardData(response);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
   
    useEffect(() => {


        fetchDashboard();
  
       

       
    


    }, []);

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[80vh]">

                    <div className="text-xl font-semibold text-gray-500">

                        Loading Dashboard...

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    return (

     

        <DashboardLayout>

            <div className="space-y-8">

                {/* Hero Section */}

                <HeroSection dashboardData={dashboardData} />

                {/* Statistics */}

                <StatsCards dashboardData={dashboardData} />

                {/* Chart + AI */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    <div className="xl:col-span-2">

                        <SpendingChart
                            data={dashboardData?.monthlyExpenses || []}
                        />

                    </div>

                    <AIInsightCard />

                </div>

                {/* Recent Expenses + Quick Actions */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    <div className="xl:col-span-2">

                        <RecentExpenses
                            expenses={dashboardData?.recentExpenses}
                        />

                    </div>

                    <QuickActions />

                </div>

            </div>

            <FloatingAIButton />

        </DashboardLayout>

    );

};

export default Dashboard;