💰 Expense Tracker

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) Expense Tracker application that helps users manage their finances efficiently. Users can securely register, log in, track expenses, view spending insights through a dashboard, and manage shared expenses.

🚀 Features
🔐 Authentication & Authorization
User Registration
Secure Login & Logout
JWT-based Authentication
Protected Routes
HTTP-Only Cookie Authentication
💵 Expense Management
Add Expenses
Edit Expenses
Delete Expenses
Categorize Expenses
Track Spending History
📊 Dashboard Analytics
Total Expenses Overview
Category-wise Expense Analysis
Spending Insights
User-specific Dashboard Data
👥 Split Expense Management
Create Shared Expenses
Manage Group Expenses
Track Expense Distribution
🌐 Responsive Design
Mobile-Friendly UI
Clean and Modern Interface
Optimized User Experience
🛠️ Tech Stack
Frontend
React.js
React Router
Axios
Tailwind CSS
Backend
Node.js
Express.js
JWT Authentication
Cookie Parser
bcrypt
Database
MongoDB Atlas
Mongoose ODM
Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
📂 Project Structure
Expense-Tracker/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/Expense-Tracker.git
cd Expense-Tracker
2️⃣ Backend Setup
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start Backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install

Create a .env file:

VITE_API_URL=http://localhost:5000

Start Frontend:

npm run dev
🔑 Environment Variables
Backend
PORT=
MONGO_URI=
JWT_SECRET=
Frontend
VITE_API_URL=
📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
POST	/api/auth/logout	Logout User
GET	/api/auth/me	Get Current User
Expenses
Method	Endpoint	Description
GET	/api/expenses	Get All Expenses
POST	/api/expenses	Create Expense
PUT	/api/expenses/:id	Update Expense
DELETE	/api/expenses/:id	Delete Expense
Dashboard
Method	Endpoint	Description
GET	/api/dashboard	Dashboard Analytics
Split Expenses
Method	Endpoint	Description
GET	/api/split-expenses	Get Split Expenses
POST	/api/split-expenses	Create Split Expense
🔒 Security Features
Password Hashing using bcrypt
JWT Authentication
Protected API Routes
HTTP-Only Cookies
CORS Configuration
Environment Variable Management
🚀 Live Demo
Frontend
https://expense-tracker-mern-zeta-eight.vercel.app
Backend
https://expense-tracker-mern-oazt.onrender.com
📸 Screenshots

Add application screenshots here.

![Login Page](screenshots/login.png)
![Dashboard](screenshots/dashboard.png)
![Expenses](screenshots/expenses.png)
🔮 Future Enhancements
Budget Management
Expense Reports Export (PDF/Excel)
Email Notifications
Dark Mode
Multi-Currency Support
AI-powered Spending Insights
Expense Prediction & Analytics
👩‍💻 Author

Shreya Mittal

Full Stack Developer | MERN Stack Enthusiast

GitHub: https://github.com/shreyamittal239

⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
