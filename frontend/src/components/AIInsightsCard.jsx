import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { analyzeExpenses } from "../services/aiService";

const AIInsightsCard = () => {
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAnalysis = async () => {
        try {
            setLoading(true);

            const response = await analyzeExpenses();

            setAnalysis(response.analysis);

        } catch (error) {
            console.log(error);

            setAnalysis(
                "Unable to generate AI insights at the moment."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalysis();
    }, []);

    return (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">

            {/* Header */}

            <div className="flex justify-between items-center gap-10 border-b border-white/20 pb-5 mb-6">

                <div>

                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        🤖 AI Financial Insights
                    </h2>

                    <p className="text-indigo-100 mt-2 text-sm">
                        Personalized financial analysis based on your expenses.
                    </p>

                </div>

                <button
                    onClick={fetchAnalysis}
                    disabled={loading}
                    className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 transition disabled:opacity-60"
                >
                    {loading ? "Analyzing..." : "Refresh"}
                </button>

            </div>

            {/* Content */}

            {loading ? (

                <div className="flex justify-center items-center h-40">

                    <div className="text-lg font-medium animate-pulse">
                        🤖 Analyzing your expenses...
                    </div>

                </div>

            ) : (

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-h-[420px] overflow-y-auto">

                    <div className="prose prose-invert max-w-none">

                        <ReactMarkdown>
                            {analysis}
                        </ReactMarkdown>

                    </div>

                </div>

            )}

        </div>
    );
};

export default AIInsightsCard;