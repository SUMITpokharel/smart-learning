import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, Typography } from "@mui/material";

const AdminCard = () => {
  const [users, setUsers] = useState([]);
  const [setReminders] = useState([]);
  const [setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:3000/api/user/getAllUsers`,
          { withCredentials: true }
        );
        const reminderResponse = await axios.get(
          `http://localhost:3000/api/user/getAllReminders`,
          { withCredentials: true }
        );
        const notesResponse = await axios.get(
          `http://localhost:3000/api/user/getAllNotes`,
          { withCredentials: true }
        );

        setUsers(userResponse.data.users || []);
        setReminders(reminderResponse.data.reminders || []);
        setNotes(notesResponse.data.notes || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });

  return (
    <Container>
      <Grid container justifyContent="center" spacing={3} sx={{ padding: 5 }}>
        <Grid item md={2}>
          <Card
            sx={{
              padding: 5,
              backgroundColor: "#003366",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {users.length}
            </Typography>
            <Typography variant="caption">Total Users</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminCard;
