import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, Typography } from "@mui/material";

const AdminCard = () => {
  const [users, setUsers] = useState([]);
  const [reminders, setReminders] = useState([]); // Correctly define reminders state
  const [notes, setNotes] = useState([]); // Correctly define notes state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const userResponse = await axios.get(
          `http://localhost:3000/api/user/getAllUsers`,
          { withCredentials: true }
        );

        // Fetch reminders
        const reminderResponse = await axios.get(
          `http://localhost:3000/api/user/getAllReminders`,
          { withCredentials: true }
        );

        // Fetch notes
        const notesResponse = await axios.get(
          `http://localhost:3000/api/user/getAllNotes`,
          { withCredentials: true }
        );

        // Update state with fetched data
        setUsers(userResponse.data.users || []);
        setReminders(reminderResponse.data.reminders || []);
        setNotes(notesResponse.data.notes || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Container>
      <Grid container justifyContent="center" spacing={3} sx={{ padding: 5 }}>
        {/* Total Users Card */}
        <Grid item md={2}>
          <Card
            sx={{
              padding: 3.5,
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

        {/* Total Reminders Card */}
        <Grid item md={2}>
          <Card
            sx={{
              padding: 3.5,
              backgroundColor: "#FF6600",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {reminders.length}
            </Typography>
            <Typography variant="caption">Total Reminders</Typography>
          </Card>
        </Grid>

        {/* Total Notes Card */}
        <Grid item md={2}>
          <Card
            sx={{
              padding: 3.5,
              backgroundColor: "#339933",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              {notes.length}
            </Typography>
            <Typography variant="caption">Total Notes</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminCard;
