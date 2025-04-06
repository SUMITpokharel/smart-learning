import React from "react";
import { Container, Grid, Divider, Card } from "@mui/material";
import AdminCard from "./Admin-card";
import TUsers from "./Latest-User";

const AdminHome = () => {
  return (
    <Container sx={{ marginTop: "100px" }}>
      <AdminCard />
      <Divider sx={{ marginY: 2 }} />
      <Grid container justifyContent="space-around" spacing={3}>
        <Grid item md={7}></Grid>
        <Grid item md={4}>
          <Card>
            <TUsers />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminHome;
