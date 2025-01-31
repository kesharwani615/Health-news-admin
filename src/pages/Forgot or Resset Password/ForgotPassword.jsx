import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SendEmailToVerifySlice } from "../../redux/features/authUser";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      
      dispatch(SendEmailToVerifySlice({email}))
    }
  };

  return (
    <div className="LoginArea">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="LoginLeft">
              <figure>
                <img src="images/Logo.svg" alt="Logo" />
              </figure>
              <h3>Forgot Password?</h3>
              <p>Enter your email address to reset your password.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email ID/Username</label>
                  <input
                    type="email"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    id="email"
                    placeholder="Enter Email ID/Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error && <div className="text-danger">{error}</div>}
                </div>
                <button type="submit" className="Button" style={{ marginTop: 10 }}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
