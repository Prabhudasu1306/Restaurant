import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSignUp } from "../Services/SignUpServices";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Add password field to form data
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
      password: "", // Clear password field
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    // Field validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Please provide a strong password. It should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      // Your signup service function to create the signup
      await createSignUp({ firstName, lastName, email, password });

      // Clear form data on successful signup
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setError("");
      navigate("/login");
    } catch (error) {
      console.error("Error creating signup:", error);
      setError("An error occurred during sign up. Please provide a correct email and password.");
    }
  };

  return (
    <div className="text-center" style={{ marginBottom: '20px' }}>
      <h5>Signup Here</h5>
      <form onSubmit={handleSubmit}>
        {/* First Name input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold', textAlign: 'left' }}>First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required style={{ width: '300px', marginLeft: '10px' }}/>
        </div>
        {/* Last Name input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold', textAlign: 'left' }}>Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required style={{ width: '300px', marginLeft: '10px' }}/>
        </div>
        {/* Email input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold', textAlign: 'left' }}>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '300px', marginLeft: '10px' }}/>
        </div>
        {/* Password input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold', textAlign: 'left' }}>Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '300px', marginLeft: '10px' }}/>
        </div>
        {/* Submit and Clear buttons */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ backgroundColor: "blue", color: "white", marginRight: "5px", padding: "5px 10px", border: "none" }}>Submit</button>
          <button type="button" onClick={handleClear} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none" }}>Clear</button>
        </div>
        {/* Error message */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
