import { useState } from "react";
import api from "../services/api";

const SettlementModal = ({
    settlement,
    groupId,
    closeModal,
    refreshBalances,
    refreshHistory,
}) => {

    const [loading, setLoading] = useState(false);

    const handleSettle = async () => {

        try {

            setLoading(true);

            const response = await api.post("/settlements", {

                groupId,

                from: settlement.from._id,

                to: settlement.to._id,

                amount: settlement.amount,

            });

            alert(response.data.message);

            refreshBalances();

            refreshHistory();

            closeModal();

        } catch (error) {

            alert(error.response?.data?.message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white rounded-xl p-6 w-[400px]">

                <h2 className="text-2xl font-bold mb-4">

                    Confirm Settlement

                </h2>

                <p>

                    <strong>{settlement.from.name} </strong>

                    will pay

                    <strong> {settlement.to.name}</strong>

                </p>

                <p className="text-3xl text-green-600 font-bold my-5">

                    ₹{settlement.amount.toFixed(2)}

                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={closeModal}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSettle}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        {loading ? "Processing..." : "Confirm"}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default SettlementModal;