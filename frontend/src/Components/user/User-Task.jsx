import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import axios from "axios";

const TaskManager = () => {
  const [categories, setCategories] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resCat = await axios.get(`http://localhost:3000/api/category`, {
      withCredentials: true,
    });
    const resTask = await axios.get(`http://localhost:3000/api/task`, {
      withCredentials: true,
    });

    const tasks = resTask.data.data;
    setActiveTasks(tasks.filter((t) => t.status === "pending"));
    setCompletedTasks(tasks.filter((t) => t.status === "completed"));
    setIncompleteTasks(tasks.filter((t) => t.status === "incomplete"));

    setCategories(resCat.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    fetchData();
    setName("");
    setCategoryId("");
    setTime("");
    setDescription("");
  };

  const completeTask = async (id) => {
    await axios.get(`http://localhost:3000/api/task/completeTask/${id}`, {
      withCredentials: true,
    });
    fetchData();
  };

  const markIncompleteTask = async (id) => {
    await axios.get(`http://localhost:3000/api/task/incompleteTask/${id}`, {
      withCredentials: true,
    });
    fetchData();
  };

  const editReminder = async (id) => {
    const res = await axios.get(`http://localhost:3000/api/task/${id}`, {
      withCredentials: true,
    });
    setEditData({ ...res.data.data, id });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    await axios.patch(
      `http://localhost:3000/api/task/${editData.id}`,
      {
        name: editData.title,
        date: editData.date,
        time: editData.time,
      },
      { withCredentials: true }
    );
    fetchData();
    setEditDialogOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Add Task Form */}
        <Grid item md={6}>
          <Card style={{ padding: 20 }}>
            <Typography variant="h6" color="blue">
              Add Your Task
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
              <TextField
                label="Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                select
                fullWidth
                required
                margin="normal"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Todo Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                label="Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button type="submit" variant="contained" style={{ backgroundColor: "#003366" }}>
                Submit
              </Button>
            </form>
          </Card>
        </Grid>

        {/* Active Task List */}
        <Grid item md={6}>
          <Card style={{ padding: 20 }}>
            <Typography variant="h6" color="blue">
              Active Task List
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.time}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => completeTask(task.id)}>
                        <Check />
                      </IconButton>
                      <IconButton onClick={() => markIncompleteTask(task.id)}>
                        <Close />
                      </IconButton>
                      <IconButton onClick={() => editReminder(task.id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        {/* Completed Task List */}
        <Grid item md={6}>
          <Card style={{ padding: 20 }}>
            <Typography variant="h6" color="green">
              Completed Task List
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        {/* Incomplete Task List */}
        <Grid item md={6}>
          <Card style={{ padding: 20 }}>
            <Typography variant="h6" color="orange">
              Incomplete Task List
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incompleteTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>

      {/* Details Dialog */}
      <Dialog open={showDetails} onClose={() => setShowDetails(false)}>
        <DialogTitle>{detailsData.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{detailsData.description}</Typography>
          <Typography variant="body2">
            {detailsData.date} at {detailsData.time}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editData.title || ""}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={editData.date || ""}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={editData.time || ""}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditSubmit}
            style={{ backgroundColor: "#003366" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskManager;
