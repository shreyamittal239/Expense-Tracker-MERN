import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { FaWallet, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Login = () => {
    const { login } = useContext(AuthContext);

     const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
   
   
    const handleSubmit= async (e) => {
        e.preventDefault();
          try {
         await login(formData);
        navigate("/dashboard");

    } catch (error) {
        console.log(error.response?.data);
    }
    }

    const navigate = useNavigate();

     
  return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

            {/* Logo */}

            <div className="flex justify-center mb-4">

                <div className="bg-green-500 p-4 rounded-full">

                    <FaWallet className="text-white text-3xl"/>

                </div>

            </div>

            <h1 className="text-3xl font-bold text-center">
                Expense Tracker
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
                Track every rupee. Save more.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Email */}

                <div className="relative">

                    <FaEnvelope
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                email:e.target.value
                            })
                        }
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                </div>

                {/* Password */}

                <div className="relative">

                    <FaLock
                        className="absolute left-4 top-4 text-gray-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                password:e.target.value
                            })
                        }
                        className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 rounded-xl font-semibold"
                >
                    Login
                </button>

            </form>

            <p className="text-center mt-6 text-gray-600">

                Don't have an account?

                <button
                    onClick={()=>navigate("/register")}
                    className="ml-2 text-green-600 hover:underline font-semibold"
                >
                    Register
                </button>


     <p className="text-center text-sm text-gray-400 mt-8">

     © 2026 Expense Tracker

    </p>
            </p>

        </div>

    </div>
     
    
  )
}

export default Login;