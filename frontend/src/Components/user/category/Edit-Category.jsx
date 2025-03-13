import React from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Breadcrum from "../User-Breadcrum";

const Addcategorydetail = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <Container>
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Edit Category"
        btnName="View Category"
        btnLink="/user/view-category"
      />
      <Grid container justifyContent="center">
        <Grid item md={6}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              Add Teacher Detail
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Please fill up the below information to help you contact your
              teacher.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
                  maxLength: {
                    value: 10,
                    message: "Name must be less than 10 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="subject"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subject"
                    fullWidth
                    margin="normal"
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    margin="normal"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Addcategorydetail;
