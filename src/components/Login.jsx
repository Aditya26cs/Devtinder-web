import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {

 const[emailId,setEmailId] = useState("Akshat@gmail.com");
 const[password,setPassword] = useState("akshat123@");
 

 const handleLogin = async () => {
     
    try{
        const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      }, {withCredentials: true});

      // while sending request to server include withCredentials: true
      // This is important for cookie-based authentication
      // Make sure your server is configured to accept credentials
     
    } catch (error) {
      console.error("Login failed:", error);
    }
      
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
      <div className="card-body ">
        <h2 className="card-title ml-26">Login Page</h2>

        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Email</legend>
          <input 
          type="text" 
          className="input border-none outline-none rounded-xl" 
          placeholder="Enter your email"
          value={emailId}  
          onChange={(e) => setEmailId(e.target.value)} />
         <legend className="fieldset-legend">Password</legend>
          <input 
          type = "password" 
          className="input border-none outline-none rounded-xl" 
          placeholder="Password" 
          value = {password} 
          onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>

        <div className="card-actions justify-center mt-2 ">
          <button className="btn btn-primary rounded-xl" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
