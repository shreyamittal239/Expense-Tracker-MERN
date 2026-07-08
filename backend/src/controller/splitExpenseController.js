const splitExpense = require("../models/splitExpense");

const createSplitExpense = async ( req,res)=>{
     const { title, totalAmount, participants } = req.body;

        if (!title || !totalAmount || !participants.length) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const share = totalAmount / participants.length;

        const participantData = participants.map((name) => ({
            name,
            share
        }));

        const splitExpense = await SplitExpense.create({
            title,
            totalAmount,
            participants: participantData,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Split Expense Created",
            splitExpense
        });
};

const getSplitExpenses = async (req,res) => {
       const splitExpenses = await SplitExpense.find({
            createdBy: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: splitExpenses.length,
            splitExpenses
        });
}

const deleteSplitExpense = async (req, res) => {

    try {

        const splitExpense = await SplitExpense.findById(req.params.id);

        if (!splitExpense) {
            return res.status(404).json({
                success: false,
                message: "Split expense not found"
            });
        }

        if (splitExpense.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        await splitExpense.deleteOne();

        res.status(200).json({
            success: true,
            message: "Split expense deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getSplitExpense = async (req, res) => {
    const splitExpense = await  SplitExpense.findOne({
        _id: req.params.id,
        createdBy: req.user.id,
    });

        if (!splitExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        if (splitExpense.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        res.status(200).json({
            success: true,
            splitExpense
        });
};

const updateSplitExpense = async (req, res) => {
       const splitExpense = await SplitExpense.findById(req.params.id);

        if (!splitExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        if (splitExpense.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

         const { title, totalAmount, participants } = req.body;

        const share = totalAmount / participants.length;

        const updatedParticipants = participants.map((participant) => ({
            name: participant.name,
            share,
        }));

        const updatedSplitExpense = await SplitExpense.findByIdAndUpdate(
            req.params.id,
            {
                    title,
                    totalAmount,
                    participants: updatedParticipants,
                },
            { 
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            updatedSplitExpense,
        });

    
};

module.exports = {
    createSplitExpense,
    getSplitExpenses,
    deleteSplitExpense,
    getSplitExpense,
    updateSplitExpense
}