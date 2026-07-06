# 💰 Expense Tracker

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to help users efficiently manage their personal finances. The platform allows users to securely track expenses, analyze spending patterns, and manage split expenses through an intuitive dashboard.

---

## 🚀 Live Demo

### Frontend
👉 https://expense-tracker-mern-zeta-eight.vercel.app

### Backend API
👉 https://expense-tracker-mern-oazt.onrender.com

---

## ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login & Logout
- JWT Authentication
- Protected Routes
- Cookie-Based Session Management

### 💸 Expense Management
- Add New Expenses
- Edit Existing Expenses
- Delete Expenses
- Categorize Transactions
- View Expense History

### 📊 Dashboard Analytics
- Total Expense Overview
- Category-wise Spending Analysis
- Recent Transactions
- Personalized User Dashboard

### 👥 Split Expenses
- Create Shared Expenses
- Manage Group Spending
- Track Expense Distribution

### 📱 Responsive UI
- Modern User Interface
- Mobile-Friendly Design
- Smooth User Experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- JWT Authentication
- Cookie Parser
- bcrypt.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```bash
Expense-Tracker/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/shreyamittal239/Expense-Tracker-MERN.git
cd Expense-Tracker-MERN
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run Frontend:

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

### Frontend

```env
VITE_API_URL=
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/logout` | Logout User |
| GET | `/api/auth/me` | Get Current User |

### Expenses

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/expenses` | Fetch All Expenses |
| POST | `/api/expenses` | Create Expense |
| PUT | `/api/expenses/:id` | Update Expense |
| DELETE | `/api/expenses/:id` | Delete Expense |

### Dashboard

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/dashboard` | Dashboard Statistics |

### Split Expenses

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/split-expenses` | Fetch Split Expenses |
| POST | `/api/split-expenses` | Create Split Expense |

---

## 🔒 Security Features

- Password Hashing using bcrypt
- JWT Authentication
- HTTP-Only Cookies
- Protected Routes
- CORS Protection
- Environment Variable Security

---

## 📸 Screenshots

### Login Page
<img width="100%" alt="Login Page" src="screenshots/login.png">

### Dashboard
<img width="100%" alt="Dashboard" src="screenshots/dashboard.png">

### Expenses
<img width="100%" alt="Expenses" src="screenshots/expenses.png">

> Replace the image paths with your actual screenshots.

---

## 🌟 Future Improvements

- Budget Planning
- Expense Export (PDF/Excel)
- Email Notifications
- Dark Mode
- Multi-Currency Support
- AI-Based Expense Insights
- Expense Forecasting

---

## 👩‍💻 Author

**Shreya Mittal**

- GitHub: https://github.com/shreyamittal239
- LinkedIn: www.linkedin.com/in/shreya-mittal-1a5ab4268

---

## ⭐ Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

### If you found this project helpful, don't forget to ⭐ the repository!
