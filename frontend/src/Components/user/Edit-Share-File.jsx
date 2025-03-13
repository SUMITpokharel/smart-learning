import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
} from "@mui/material";
import Breadcrum from "./User-Breadcrum";

const EditShareFile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    userId: "",
    authId: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchShareFile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/shareFile/shareFile/${id}`,
          {
            withCredentials: true,
          }
        );
        setForm(response.data.data);
      } catch (error) {
        console.error("Error fetching file details:", error);
      }
    };
    fetchShareFile();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (image) formData.append("image", image);
    formData.append("userId", form.userId);
    formData.append("authId", form.authId);

    try {
      await axios.post(
        `http://localhost:3000/api/shareFile/update/${id}`,
        formData,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Success");
      navigate("/user/share-file");
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  return (
    <Container>
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Share File"
        btnName="Back to Share File List"
        btnLink="/user/share-file"
      />
      <Card sx={{ padding: 4, maxWidth: 600 }}>
        <Typography variant="h6" color="blue">
          Edit Share File
        </Typography>
        <Typography variant="caption" color="blue">
          Update your share file details.
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
          />
          <input
            type="file"
            accept="image/*, .pdf, .doc, .docx"
            onChange={handleFileChange}
            required
            style={{ marginTop: 16, marginBottom: 16 }}
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: "#003366" }}>
            Update Share File
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default EditShareFile;
