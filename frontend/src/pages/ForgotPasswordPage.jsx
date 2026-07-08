import React, { useState } from 'react'

const ForgotPasswordPage = () => {

    const [ email , setEmail] = useState("");

    const handleSubmit = async (e) =>{
         e.preventDefault();

         console.log(email);
    }
  return (
    <form onSubmit={handleSubmit}>
        <input 
        type="email"
        value={email}
        placeholder='Enter your email'
        onChange={(e)=> {
            setEmail(e.target.value)
        }}
        required
        />

        <button 
        type='submit'>
            Send Reset Link
        </button>
    </form>
  )
}

export default ForgotPasswordPage