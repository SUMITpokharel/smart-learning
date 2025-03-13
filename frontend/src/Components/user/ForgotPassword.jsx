import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TextField, Button, Container, Typography, Box } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/user/");
    }
  }, [navigate]);

  const submitForm = async () => {
    try {
      const user = { email };
      await axios.post("http://localhost:3000/api/user/forgotPassword", user);
      navigate("/reset-password");
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" color="primary" gutterBottom>
          ForgotPassword
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Please input the right credentials to log in
        </Typography>
        <TextField
          fullWidth
          label="E-mail"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={submitForm}
          sx={{ mt: 2 }}
          
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
