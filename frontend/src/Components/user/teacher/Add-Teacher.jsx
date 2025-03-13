import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";

import Breadcrum from "../User-Breadcrum";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, subject, email, address, phone };
    try {
      await axios.post(`http://localhost:3000/api/teacher`, data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      alert("Successfully Added");
      navigate("/user/view-teacher");
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <Container>
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Add Teacher"
        btnName="View Teacher"
        btnLink="/user/view-teacher"
      />
      <Card sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 5 }}>
        <Typography variant="h6" color="success.main">
          Add Teacher Detail
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Please fill up the below information to help you contact your teacher.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="dense"
            required
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default AddTeacher;
