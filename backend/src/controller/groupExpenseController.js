const GroupExpense = require("../models/groupExpense")
const User  = require("../models/User")
const Group = require("../models/group")

const addGroupExpense = async(req , res) =>{
        try {

        const {
            groupId,
            title,
            amount,
            paidBy,
            participants,
            description,
        } = req.body;

        // Validate input
        if (
            !groupId ||
            !title ||
            !amount ||
            !paidBy ||
            !participants ||
            participants.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        // Check if group exists
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found.",
            });
        }

        // Logged-in user must belong to this group
        if (!group.members.includes(req.user.id)) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this group.",
            });
        }

        // Everyone in participants must belong to the group
        const allMembers = participants.every((memberId) =>
            group.members.some(
                (member) => member.toString() === memberId.toString()
            )
        );

        if (!allMembers) {
            return res.status(400).json({
                success: false,
                message: "Some selected participants are not group members.",
            });
        }

        const expense = await GroupExpense.create({
            group: groupId,
            title,
            amount,
            paidBy,
            participants,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Expense added successfully.",
            expense,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

    
};

const getGroupExpenses = async (req, res) => {

    try {

        const group = await ExpenseGroup.findById(req.params.groupId);

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found.",
            });
        }

        if (!group.members.includes(req.user.id)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized.",
            });
        }

        const expenses = await GroupExpense.find({
            group: req.params.groupId,
        })
            .populate("paidBy", "name profileImage")
            .populate("participants", "name profileImage")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            expenses,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }



}

const deleteGroupExpense = async (req, res) => {

    try {

        const expense = await GroupExpense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found.",
            });
        }

        if (expense.paidBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Only the payer can delete this expense.",
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully.",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    addGroupExpense,
    getGroupExpenses,
    deleteGroupExpense,
};