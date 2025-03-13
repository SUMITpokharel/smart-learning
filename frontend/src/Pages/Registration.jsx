import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.result[1]) {
        localStorage.setItem("avatar", response.data.result[0].image);
        localStorage.setItem("name", response.data.result[0].name);
        localStorage.setItem("email", response.data.result[0].email);
        alert("Successfully Registered!");
        navigate("/login");
      } else {
        alert("Email already in use");
      }
    } catch (error) {
      alert("Error while registering");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h5" color="#c4581a" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 20,
              message: "Name must be less than 20 characters",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "E-mail is required",
            pattern: { value: /.+@.+\..+/, message: "E-mail must be valid" },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Min 8 characters" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              {...register("terms", { required: "You must agree to continue" })}
            />
          }
          label="I agree to the privacy policy"
        />
        {errors.terms && (
          <Typography color="error">{errors.terms.message}</Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px", backgroundColor: "#c4581a" }}
        >
          Register
        </Button>
        <Typography variant="caption">
          Already registered?{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </form>
    </Container>
  );
};

export default RegistrationForm;
