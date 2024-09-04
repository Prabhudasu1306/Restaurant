
import React, { useState } from "react";
import { getAllSignUp } from "../Services/SignUpServices";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import "./Login.css";
import KLN1 from '../Images/KLN1.jpeg';
import KLN5 from '../Images/KLN5.jpeg';
import KLN from '../Images/KLN.jpeg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await getAllSignUp();
      const signUpDetails = response.data;
      const matchedSignUp = signUpDetails.find(
        (signUp) => signUp.email === email && signUp.password === password
      );

      if (matchedSignUp) {
        setMessage("");
        logIn(matchedSignUp.firstName); 
        alert("Successfully logged in!"); 
        navigate("/home");
      } else {
        setMessage("Incorrect email or password.");
      }
    } catch (error) {
      console.error("Error fetching sign-up details:", error);
      setMessage("An error occurred while logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          {message && <p>{message}</p>}
          <p>New member? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
      <div className="image-container">
        <div className="image-container-inner">
          <img src={KLN5} alt="KLN5" />
          <img src={KLN1} alt="KLN1" />
          <img src={KLN} alt="KLN" />
        </div>
      </div>
    </div>
  );
};

export default Login;




