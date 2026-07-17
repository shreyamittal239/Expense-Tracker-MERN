const buildExpenseAnalysisPrompt = ( totalExpenses,
    categoryBreakdown,
    highestExpense,
    recentExpenses) => {

        return   `
        You are an expert personal finance advisor.

Analyze the following expense data and provide useful financial insights.

Total Expenses:
₹${totalExpenses}

Category Breakdown:
${JSON.stringify(categoryBreakdown, null, 2)}

Highest Expense:
${highestExpense.title} - ₹${highestExpense.amount}
Category: ${highestExpense.category}

Recent Expenses:
${JSON.stringify(recentExpenses, null, 2)}

Please provide your response in the following format:

1. Spending Overview

2. Highest Spending Category

3. Areas of Improvement

4. Budget Suggestions

5. Final Advice

Rules:
- Use only the provided expense data.
- Do not invent values.
- Be concise.
- Be professional.
- Give actionable suggestions.

Format the response in proper Markdown.

Requirements:

- Use ## headings
- Use bullet points
- Highlight important numbers in bold
- Keep the response concise (200-250 words)
- Focus on actionable insights
- Do not write large paragraphs
- End with a short financial tip
        `;

}

const buildChatPrompt = (
    summary,
    message
) => {
        return `
You are an expert personal finance advisor.

Your job is to answer the user's financial questions using ONLY the expense data provided below.

==========================
USER EXPENSE SUMMARY
==========================

Total Expenses:
₹${summary.totalExpenses}

Category Breakdown:
${JSON.stringify(summary.categoryBreakdown, null, 2)}

Highest Expense:
${summary.highestExpense.title}
Amount: ₹${summary.highestExpense.amount}
Category: ${summary.highestExpense.category}

Recent Expenses:
${JSON.stringify(summary.recentExpenses, null, 2)}

==========================
USER QUESTION
==========================

${message}

==========================
INSTRUCTIONS
==========================

1. Answer only using the provided expense data.
2. Do not invent expenses or values.
3. If the information is unavailable, politely say so.
4. Keep the response friendly and professional.
5. Give practical financial suggestions whenever possible.
`;


}

module.exports = {
    buildExpenseAnalysisPrompt,
    buildChatPrompt
}