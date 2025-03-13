import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Divider,
  MenuItem,
} from "@mui/material";
import Breadcrum from "../User-Breadcrum";
import { useForm, Controller } from "react-hook-form";

const AddCategory = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/category`,
        data,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      navigate("/user/view-category");
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  return (
    <Container>
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Add Category"
        btnName="View Category"
        btnLink="/user/view-category"
      />
      <Container maxWidth="sm">
        <Card sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h6" color="blue">
            Add Category
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Keyword for your category.
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="cat"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(e) => {
                    field.onChange(e);
                    setCategory(e.target.value);
                  }}
                  error={!!errors.cat}
                  helperText={errors.cat?.message}
                >
                  {["Task", "Notes"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: 30,
                  message: "Name must be less than 30 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Category Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#003366" }}
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Container>
    </Container>
  );
};

export default AddCategory;
