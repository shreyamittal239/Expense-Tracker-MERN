import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'

const ResetPasswordPage = () => {

    const {token} = useParams();

    const [ password , setPassword] = useState("");
    const [ confirmPassword , setConfirmPassword] = useState("");
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }


    await api.post(
        `/auth/reset-password/${token}`,
        {
            password,
            confirmPassword
        }
    );

    navigate("/login");
};

  return (
     <form onSubmit={handleSubmit}>

<input
    type="password"
    placeholder="New Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
/>

<input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button type="submit">
    Reset Password
</button>

</form>

  )
}

export default ResetPasswordPage