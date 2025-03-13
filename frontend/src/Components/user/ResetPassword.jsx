import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TextField, Button, Container, Typography, Box } from "@mui/material";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email
      ? /^.+@.+\..+$/.test(email)
        ? ""
        : "Invalid email"
      : "E-mail is required";
    tempErrors.password =
      password.length >= 8 ? "" : "Min 8 characters required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/resetpassword",
        { email, otp, password }
      );
      if (response.data.status === 404) {
        alert(response.data.message);
        return;
      }
      alert("Successfully Changed");
      navigate("/login");
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" color="primary" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          label="E-mail"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          fullWidth
          label="OTP (From email)"
          variant="outlined"
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
