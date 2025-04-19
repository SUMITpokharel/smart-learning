import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/verifyEmail", {
        email,
        otp,
      });

      alert(response.data.message);
      navigate("/login"); // Redirect to login page after verification
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h5" style={{ color: "#c4581a", textAlign: "center" }}>
        Verify Your Email
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="OTP"
        fullWidth
        margin="normal"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleVerify}
        style={{ marginTop: "10px", backgroundColor: "#c4581a" }}
      >
        Verify
      </Button>
      {message && <Typography color="error">{message}</Typography>}
    </div>
  );
};

export default VerifyEmail;