import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /.+@.+\..+/;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard"); // Redirect logged-in users
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("All fields are required");
      setLoginFailed(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      setLoginFailed(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        }
      );

      const { newData } = response.data;

      localStorage.setItem("avatar", newData.image);
      localStorage.setItem("name", newData.name);
      localStorage.setItem("email", newData.email);
      localStorage.setItem("token", newData.token);
      Cookies.set("token", newData.token, { expires: 1 });

      alert("Successfully Logged In!");
      navigate(newData.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Login Failed. Please check your inputs.");
      }
      setLoginFailed(true);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography
        variant="h5"
        style={{ color: "#c4581a", textAlign: "center" }}
      >
        Login Form
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        Please input the correct credentials to log in.
      </Typography>

      <TextField
        label="E-mail"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!email && !emailRegex.test(email)}
        helperText={
          !!email && !emailRegex.test(email) ? "Invalid email format" : ""
        }
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={() => setShowPassword(!showPassword)}
        style={{ marginBottom: "10px" }}
      >
        
      </Button>

      <Typography variant="caption" display="block" gutterBottom>
        Forgot Password?{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "blue",
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Reset Now
        </span>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={{
          marginTop: "10px",
          backgroundColor: "#c4581a",
          color: "white",
        }}
      >
        Login
      </Button>

      <Typography variant="caption" display="block" gutterBottom>
        Not registered?{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "blue",
          }}
          onClick={() => navigate("/registration")}
        >
          Register
        </span>
      </Typography>

      <Snackbar
        open={loginFailed}
        autoHideDuration={3000}
        onClose={() => setLoginFailed(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default Login;
