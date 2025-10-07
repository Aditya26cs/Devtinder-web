import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import base_url from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[firstName , setFirstName] = useState("");
  const[lastName , setLastName] = useState("");
  const[isLoginForm , setIsLoginForm] = useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const res = await axios.post(
        base_url + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log("Login successful:", res.data);

      // while sending request to server include withCredentials: true
      // This is important for cookie-based authentication
      // Make sure your server is configured to accept credentials

      dispatch(addUser(res.data)); 
      return navigate("/");

      // dispatch(...) sends this action object to the Redux store.
      // {
      //   type: "user/addUser",   // tells Redux: "this belongs to userSlice → addUser reducer" :- automatically generated
      //   payload: res.data       // the data you passed
      // }
    } catch (error) {
       setError("Invalid email or password");
    }
  };

  const handleSignUp = async () => {
    try {
       const res = await axios.post(
        base_url + "/signup", { firstName, lastName,  emailId,  password}, { withCredentials: true }
        );  
        console.log("Signup successful:", res.data)
         dispatch(addUser(res.data)); 
         return navigate("/profile")
      } catch(err) {
        setError(err?.response?.data || "something went wrong")
      }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">

      <div className="card-body ">

        <h2 className="card-title ml-26">{isLoginForm? "Login form " : "SignUp form"}</h2>

        <fieldset className="fieldset ">

         {!isLoginForm  && 
          <> <legend className="fieldset-legend">FirstName</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <legend className="fieldset-legend">lastName</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Password"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          /> </>}
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            className="input border-none outline-none rounded-xl"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input border-none outline-none rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

       <p className="text-red-500">{error}</p>

        <div className="card-actions justify-center mt-2 ">
          <button className="btn btn-primary rounded-xl" onClick={isLoginForm ? handleLogin : handleSignUp}>
             {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

         
      <p className="m-auto mt-4  cursor-pointer" onClick={() => {setIsLoginForm((value) => !value)}}>{isLoginForm? "New User ? Signup Here" : "Existing User ? Login"}</p>


      </div>

    </div>
  );

};

export default Login;
