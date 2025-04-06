import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/getAllUsers`,
          { withCredentials: true }
        );
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.get(`http://localhost:3000/api/user/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User Deleted !!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container sx={{ paddingTop: "100px" }}>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h6" color="primary">
          Recent Users
        </Typography>
        <Typography variant="caption">
          List of all the recent registered users
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        {users.map((user) => (
          <Card
            key={user.id}
            sx={{
              margin: 2,
              padding: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user.image}
              sx={{ width: 36, height: 36, marginRight: 2 }}
            />
            <Grid container>
              <Typography variant="subtitle2">{user.name}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </Grid>
            <IconButton onClick={() => deleteUser(user.id)} color="error">
              <RemoveCircleIcon />
            </IconButton>
          </Card>
        ))}
      </Card>
    </Container>
  );
};

export default RecentUsers;
