import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Card,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "react-quill/dist/quill.snow.css";
import { Edit, Check, Close, Visibility } from "@mui/icons-material";

const TaskManager = () => {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [time, setTime] = useState("");
  const [description] = useState("");
  const [setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/category`, {
        withCredentials: true,
      });
      const responseTask = await axios.get(`http://localhost:3000/api/task`, {
        withCredentials: true,
      });
      setCategories(response.data.data);
      setTasks(responseTask.data.data);
    };
    fetchData();
  }, []);

  const createTask = async () => {
    await axios.post(
      `http://localhost:3000/api/task`,
      {
        name,
        categoryId,
        date,
        time,
        description,
      },
      { withCredentials: true }
    );
    refreshTasks();
  };

  const refreshTasks = async () => {
    const responseTask = await axios.get(`http://localhost:3000/api/task`, {
      withCredentials: true,
    });
    setTasks(responseTask.data.data);
  };

  const handleCompleteTask = async (taskId) => {
    await axios.get(`http://localhost:3000/api/task/completeTask/${taskId}`, {
      withCredentials: true,
    });
    refreshTasks();
  };

  const handleIncompleteTask = async (taskId) => {
    await axios.get(`http://localhost:3000/api/task/incompleteTask/${taskId}`, {
      withCredentials: true,
    });
    refreshTasks();
  };

  const handleShowDetails = (task) => {
    setSelectedTask(task);
    setOpenDetailsDialog(true);
  };

  const handleEditReminder = (task) => {
    setSelectedTask(task);
    setOpenEditDialog(true);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h6" color="blue">
              Add Your Task
            </Typography>
            <Typography variant="caption" color="blue">
              Please add the task to execute it
            </Typography>
            <Divider sx={{ my: 2 }} />

            <TextField
              select
              fullWidth
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              margin="normal"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Todo Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              type="time"
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              margin="normal"
            />

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={createTask}
              style={{ backgroundColor: "#003366" }}
            >
              Submit
            </Button>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h6" color="blue">
              Task List
            </Typography>
            <Typography variant="caption" color="blue">
              Please mark as complete if done
            </Typography>
            <Divider sx={{ my: 2 }} />

            {tasks.map((task) => (
              <Grid container key={task.id} spacing={2} alignItems="center">
                <Grid item xs={4}>
                  {task.name}
                </Grid>
                <Grid item xs={3}>
                  {task.date}
                </Grid>
                <Grid item xs={2}>
                  {task.time}
                </Grid>
                <Grid item xs={3}>
                  <IconButton
                    color="warning"
                    onClick={() => handleEditReminder(task)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleIncompleteTask(task.id)}
                  >
                    <Close />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleShowDetails(task)}
                  >
                    <Visibility />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
      >
        <DialogTitle>{selectedTask?.name}</DialogTitle>
        <DialogContent>{selectedTask?.description}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskManager;
