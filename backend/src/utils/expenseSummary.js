

const buildExpenseSummary = (expenses) => {
  
      
       if (!expenses.length) {
           throw new Error("No expenses found.");
       }
   
       const totalExpenses = expenses.reduce(
           (sum, expense) => sum + expense.amount,
           0
       );
   
       const categoryBreakdown = {};
   
       expenses.forEach((expense) => {
           categoryBreakdown[expense.category] =
               (categoryBreakdown[expense.category] || 0) + expense.amount;
       });
   
       const highestExpense = expenses.reduce((prev, curr) =>
           prev.amount > curr.amount ? prev : curr
       );
   
       const recentExpenses = expenses.slice(0, 10).map((expense) => ({
           title: expense.title,
           amount: expense.amount,
           category: expense.category,
           date: expense.date,
       }));
    return {
        totalExpenses,
        categoryBreakdown,
        highestExpense,
        recentExpenses
    };
};
module.exports = {buildExpenseSummary}