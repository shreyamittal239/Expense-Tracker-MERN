const { analyzeExpenses, askFinancialAssistant } = require("../services/financeAIService");

 const chatWithAI = async ( req , res ) => {
    try {
        const { message } = req.body;

        if( !message || !message.trim()) {
            return res.status(400).json({
                success:false,
                message:"Message is required."
            })
        }

         const response = await askFinancialAssistant( req.user.id,message);

         return res.status(200).json({
            success: true,
            response
        });



    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
};

const analyzeExpenseController = async (req, res) => {
    try {

        const response = await analyzeExpenses(req.user.id);

        res.status(200).json({
            success: true,
            analysis: response,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


module.exports = {chatWithAI,
    analyzeExpenseController
}