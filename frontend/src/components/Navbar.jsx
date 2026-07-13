import React from 'react'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

const navigate = useNavigate();
const handleLogout = async () => {

    await logout();

    navigate("/login");

};
  return (
     <nav className="bg-slate-900 text-white shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <div className="flex items-center gap-3">

                    <FaWallet className="text-2xl text-green-400"/>

                    <h1 className="text-2xl font-bold">

                        Expense Tracker

                    </h1>

                </div>

                <div className="flex gap-6">

                    <Link
                        to="/dashboard"
                        className="hover:text-green-400"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/expenses"
                        className="hover:text-green-400"
                    >
                        Expenses
                    </Link>

                    <Link
                        to="/add-expense"
                        className="hover:text-green-400"
                    >
                        Add Expense
                    </Link>
                    <Link
                        to="/split-expense"
                        className="hover:text-green-400"
                    >
                        Split Expense
                    </Link>

                     <Link
                        to="/groups"
                        className="hover:text-green-400"
                       
                    > <FaUsers />
                        Groups
                    </Link>

                </div>

                <div className="flex items-center gap-5">

                    <button
       onClick={() => navigate("/profile")}
       className="flex items-center gap-2 hover:text-blue-600"
       
     >
            <FaUserCircle size={22} />
             {user?.name}
          </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );


  
}

export default Navbar