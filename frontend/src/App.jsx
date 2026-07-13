import { Routes , Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import DashboardCard from "./components/DashboardCard";
import SplitExpense from "./pages/SplitExpense";
import NotFound from "./pages/NotFound";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import EditSplitExpense from "./pages/EditSplitExpense";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";


function App() {
   return (
  
 
   <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register />} />

      <Route path="/groups" element={<Groups />} />
      <Route
    path="/groups/:id"
    element={<GroupDetails />}
/>

      {/* Protected Routes */}
      <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
      <Route path="/expenses" element={ <ProtectedRoute><Expenses /></ProtectedRoute>} />
      <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
      <Route path="/split-expense" element={<SplitExpense />} />
      <Route path="/edit-expense/:id" element={<ProtectedRoute><EditExpense /></ProtectedRoute>} />
      <Route
    path="/edit-split-expense/:id"
    element={
        <ProtectedRoute>
            <EditSplitExpense />
        </ProtectedRoute>
    }
/>
<Route
    path="/reset-password/:resetToken"
    element={<ResetPasswordPage />}
/>
<Route
    path="/profile"
    element={<Profile />}
/>
<Route 
 path="/forgot-password"
 element={<ForgotPasswordPage/>}
 />
      

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
   
    
  )
}

export default App
