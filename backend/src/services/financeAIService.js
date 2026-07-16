const Expense = require("../models/expense");
const { generateAIResponse } = require("./geminiService");
const { buildExpenseAnalysisPrompt , buildChatPrompt } = require("../utils/promptBuilder");
const  {buildExpenseSummary } = require("../utils/expenseSummary")


const analyzeExpenses = async (userId) => {
    
    const expenses = await Expense.find({
    user: userId,
}).sort({ date: -1 });

if (!expenses.length) {
    throw new Error("No expenses found.");
}

   const summary = buildExpenseSummary(expenses);

   const {
    totalExpenses,
    categoryBreakdown,
    highestExpense,
    recentExpenses,
} = summary;

   const prompt = buildExpenseAnalysisPrompt(
        totalExpenses,
        categoryBreakdown,
        highestExpense,
        recentExpenses
    );


    const response = await generateAIResponse(prompt);

    return response;
};

const askFinancialAssistant = async (
    userId,
    message
) => {
    const expenses = await Expense.find({
           user: userId
       }).sort({ date: -1 });
   
       if (!expenses.length) {
    throw new Error("No expenses found.");
}
   const summary = buildExpenseSummary(expenses);
   const prompt = buildChatPrompt(
    summary,
    message
);
    const response =
         await generateAIResponse(prompt);

         return response;
}

module.exports = {
    analyzeExpenses,
askFinancialAssistant
};