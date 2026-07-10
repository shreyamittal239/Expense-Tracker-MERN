
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const splitExpenseRoutes = require("./routes/splitExpenseRoutes")
const cors = require("cors")
const budgetRoutes = require("./routes/budgetRoutes");


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[ "http://localhost:5173",
    "https://expense-tracker-mern-zeta-eight.vercel.app", // your frontend (Vite)
    ],
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("Expense Tracker API is running...");
});


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/splitExpenses", splitExpenseRoutes);
app.use("/api/budget", budgetRoutes);


module.exports = app;