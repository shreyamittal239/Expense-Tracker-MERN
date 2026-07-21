import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const SpendingChart = ({ data =[]}) => {

    return (

        <div
            className="
                bg-white/80
                backdrop-blur-xl
                rounded-3xl
                border
                border-white
                shadow-sm
                p-8
                h-[430px]
            "
        >

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Monthly Spending
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Your expenses across different months
                    </p>

                </div>

            </div>

            <div className="h-[320px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            formatter={(value) => [`₹${value}`, "Spent"]}
                            cursor={{
                                stroke: "#6366F1",
                                strokeWidth: 1,
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#6366F1"
                            strokeWidth={4}
                            dot={{
                                r: 5,
                                strokeWidth: 2,
                                fill: "#6366F1",
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default SpendingChart;