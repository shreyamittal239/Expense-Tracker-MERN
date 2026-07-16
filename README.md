# Expense Tracker

A full-stack MERN Expense Tracker that enables users to manage personal and shared expenses efficiently. The application supports secure authentication, group expense management, automatic balance calculation, settlements, and an interactive dashboard for tracking financial activities.

---

## Overview

Expense Tracker is designed to simplify expense management for both individuals and groups. Users can create groups, add members, record shared expenses, calculate balances automatically, and settle outstanding dues with an optimized settlement algorithm.

The project follows a scalable MVC architecture and implements secure authentication, RESTful APIs, and responsive user interfaces.

---

## Features

### Authentication

- User Registration
- Secure Login & Logout
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

---

### Personal Expense Management

- Add Expenses
- Update Expenses
- Delete Expenses
- Expense Categories
- Dashboard Statistics
- Monthly Expense Overview

---

### Group Management

- Create Groups
- View Group Details
- Add Members to Existing Groups
- Member Management
- Group Expense Dashboard

---

### Shared Expenses

- Add Shared Expenses
- Edit Shared Expenses
- Delete Shared Expenses
- Expense Description
- Participant Selection
- Payer Management

---

### Balance Calculation

- Automatic Equal Expense Splitting
- Individual Net Balance Calculation
- Creditor & Debtor Identification
- Settlement Suggestions
- Optimized Settlement Generation

---

### Settlement System

- Record Settlements
- Settlement History
- Automatic Balance Updates
- Outstanding Balance Tracking

---

### Dashboard

- Total Expenses
- Category-wise Summary
- Recent Transactions
- Group Statistics
- Pending Settlements

---

### Security

- JWT Authentication
- Password Hashing
- Authorization Middleware
- Protected REST APIs
- User Ownership Validation

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Project Structure

```
Expense-Tracker
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

## Database Models

- User
- Expense
- Group
- GroupExpense
- Settlement

---

## Core Algorithms

### Expense Splitting

- Equal share calculation
- Participant-wise contribution
- Net balance generation

### Settlement Algorithm

The application minimizes the number of transactions required to settle all outstanding balances by:

- Calculating net balances
- Identifying creditors and debtors
- Matching users using a greedy settlement approach
- Generating optimized settlement suggestions

---

## API Modules

### Authentication

- Register User
- Login User
- Logout User

### Expenses

- Add Expense
- Update Expense
- Delete Expense
- Get Expenses

### Dashboard

- Dashboard Statistics
- Category Aggregation

### Groups

- Create Group
- Get User Groups
- Add Member
- Group Details

### Group Expenses

- Add Expense
- Update Expense
- Delete Expense
- Get Expenses
- Calculate Balances

### Settlements

- Record Settlement
- Settlement History

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Expense-Tracker.git
```

### Install Backend

```bash
cd backend
npm install
```

### Install Frontend

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file inside the backend directory.

```
PORT=
MONGODB_URI=
JWT_SECRET=
CLIENT_URL=
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm run dev
```

---

## Future Enhancements

- Real-time Notifications using Socket.io
- Live Group Activity
- Group Chat
- Expense Search & Filtering
- File Attachments for Receipts
- Payment Gateway Integration
- Email Notifications
- Multi-Currency Support
- Dark Mode
- Mobile Responsive Enhancements

---

## Author

**Shreya Mittal**

Full Stack MERN Developer

GitHub: https://github.com/shreyamittal239



---
