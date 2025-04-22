import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminCard = () => {
  const [users, setUsers] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reminderRes, notesRes] = await Promise.all([
          axios.get("http://localhost:3000/api/user/getAllUsers", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/user/getAllReminders", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/user/getAllNotes", {
            withCredentials: true,
          }),
        ]);

        setUsers(userRes.data.users || []);
        setReminders(reminderRes.data.reminders || []);
        setNotes(notesRes.data.notes || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = [
    {
      name: "Users",
      Users: users.length,
    },
    {
      name: "Reminders",
      Reminders: reminders.length,
    },
    {
      name: "Notes",
      Notes: notes.length,
    },
  ];

  const cards = [
    {
      label: "Total Users",
      count: users.length,
      color: "#003366",
    },
    {
      label: "Total Reminders",
      count: reminders.length,
      color: "#FF6600",
    },
    {
      label: "Total Notes",
      count: notes.length,
      color: "#2E8B57",
    },
  ];

  if (loading) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Summary Cards */}
      <Grid container justifyContent="center" spacing={4}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={4}
              sx={{
                backgroundColor: card.color,
                color: "#fff",
                padding: 3,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography variant="h3" fontWeight="bold">
                {card.count}
              </Typography>
              <Typography variant="subtitle1">{card.label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bar Chart */}
      <Paper elevation={4} sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Overview Chart
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={[
              {
                name: "Overview",
                Users: users.length,
                Reminders: reminders.length,
                Notes: notes.length,
              },
            ]}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="Users" fill="#003366" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Reminders" fill="#FF6600" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Notes" fill="#2E8B57" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default AdminCard;
