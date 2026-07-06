import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#6366F1",
    "#6B7280",
];


const ExpensePieChart = ({data}) => {

    const chartData = data.map((item) =>({
        name:item._id,
        value:item.total,
    }))

  return (
   
        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
                Expenses by Category
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        nameKey="name"
                        label
                    >

                        {chartData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

  
}

export default ExpensePieChart