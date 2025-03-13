import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Card,
  TextField,
  Button,
  Divider,
  Typography,
} from "@mui/material";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);
      formData.append("password", password);

      await axios.post(
        `http://localhost:3000/api/user/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

     
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" color="blue" gutterBottom>
          Update Profile
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            inputProps={{ minLength: 8 }}
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginTop: 16 }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#003366" }}
            sx={{ marginTop: 2 }}
          >
            Update
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default UpdateProfile;
