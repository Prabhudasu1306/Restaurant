import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createSignUp } from "../Services/SignUpServices";
import "./Signup.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", 
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

   
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Please provide a strong password. It should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      
      await createSignUp({ firstName, lastName, email, password });

      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setError("");
      alert("Successfully signed up!"); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error creating signup:", error);
      setError("An error occurred during sign up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h5>Signup Here</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label><br/>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Last Name:</label><br/>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label><br/>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label><br/>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <center>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear</button>
          </center>
        </div>
        {error && <p>{error}</p>}
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Signup;
