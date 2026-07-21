import { Bot, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { analyzeExpenses } from "../../services/aiService";

const AIInsightCard = () => {

    const [analysis, setAnalysis] = useState("");

    const [loading, setLoading] = useState(false);

    const fetchAnalysis = async () => {

        try {

            setLoading(true);

            const response = await analyzeExpenses();

            setAnalysis(response.analysis);

        } catch {

            setAnalysis("Unable to fetch AI insights.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAnalysis();

    }, []);

    return (

        <div
            className="
            bg-gradient-to-br
            from-indigo-600
            via-violet-600
            to-purple-700
            rounded-3xl
            text-white
            p-8
            shadow-xl
            h-[430px]
            flex
            flex-col
            "
        >

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">

                    <Bot size={26} />

                    <h2 className="text-2xl font-bold">

                        AI Insights

                    </h2>

                </div>

                <button

                    onClick={fetchAnalysis}

                    className="hover:bg-white/20 p-2 rounded-xl"

                >

                    <RefreshCcw size={18} />

                </button>

            </div>

            <div className="mt-8 flex-1 overflow-auto">

                {

                    loading ?

                    <p>

                        Analyzing your finances...

                    </p>

                    :

                    <p className="leading-8 whitespace-pre-wrap text-indigo-100">

                        {analysis}

                    </p>

                }

            </div>

        </div>

    );

};

export default AIInsightCard;