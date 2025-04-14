import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";

const AdminUpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/getMe`,
          { withCredentials: true }
        );
        const user = response.data.user;
        setName(user.name);
        setEmail(user.email);
        setImage(user.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const submitForm = async () => {
    // Validate password length
    if (password && password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password); // Only append if password is provided
    if (image) formData.append("image", image);

    try {
      await axios.patch(
        `http://localhost:3000/api/user/updatePassword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      alert("Profile Updated Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container sx={{ padding: 6, marginTop: "100px" }}>
      <Grid container justifyContent="center">
        <Grid item md={5}>
          <Card sx={{ padding: 6, textAlign: "center" }}>
            <Avatar
              src={image}
              sx={{ width: 70, height: 70, margin: "auto" }}
            />
            <Typography variant="h6" color="primary">
              Hello! {name}
            </Typography>
            <Typography variant="caption">{email}</Typography>
            {/* Name Field */}
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              value={email}
              disabled
              margin="normal"
            />
            {/* Update Password Field */}
            <TextField
              fullWidth
              type="password"
              label="Update Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            {/* File Input Styled as a TextField */}
            <label
              htmlFor="file-input"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                color="black"
                component="span"
                sx={{ marginRight: 1 }}
              >
                Choose File
              </Button>
              <Typography variant="body2">
                {image ? image.name : "No file chosen"}
              </Typography>
            </label>
            {/* Update Profile Button */}
            <Button
              variant="contained"
              color="black"
              onClick={submitForm}
              sx={{ marginTop: 2 }}
            >
              Update Profile
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminUpdateProfile;
