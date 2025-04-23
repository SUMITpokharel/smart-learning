import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  Card,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Reminder = () => {
  const [date, setDate] = useState(dayjs()); // Use dayjs
  const [time, setTime] = useState(dayjs());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reminders, setReminders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState(dayjs());
  const [editTime, setEditTime] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);

  // Error states for validation
  const [errors, setErrors] = useState({
    name: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reminder", {
        withCredentials: true,
      });
      setReminders(response.data.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", date: "", time: "" };

    if (!name.trim()) {
      newErrors.name = "Reminder Title is required.";
      isValid = false;
    }

    if (!date || date.isBefore(dayjs(), "day")) {
      newErrors.date = "Date cannot be in the past.";
      isValid = false;
    }

    if (
      !time ||
      dayjs(`${date.format("YYYY-MM-DD")} ${time.format("HH:mm")}`).isBefore(
        dayjs()
      )
    ) {
      newErrors.time = "Time cannot be in the past.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createReminder = async () => {
    if (!validateForm()) return;

    try {
      await axios.post(
        "http://localhost:3000/api/reminder",
        {
          title: name,
          date: date.format("YYYY-MM-DD"),
          time: time.format("HH:mm"),
          description,
        },
        { withCredentials: true }
      );
      fetchReminders();
      resetForm();
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  const editReminder = async (id) => {
    try {
      setOpenDialog(true);
      const response = await axios.get(
        `http://localhost:3000/api/reminder/${id}`,
        { withCredentials: true }
      );
      const data = response.data.data;
      setEditId(id);
      setEditName(data.title);
      setEditDate(dayjs(data.date));
      setEditTime(dayjs(data.time, "HH:mm"));
    } catch (error) {
      console.error("Error editing reminder:", error);
    }
  };

  const updateReminder = async () => {
    if (
      !editName.trim() ||
      !editDate ||
      editDate.isBefore(dayjs(), "day") ||
      !editTime ||
      dayjs(
        `${editDate.format("YYYY-MM-DD")} ${editTime.format("HH:mm")}`
      ).isBefore(dayjs())
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3000/api/reminder/${editId}`,
        {
          title: editName,
          date: editDate.format("YYYY-MM-DD"),
          time: editTime.format("HH:mm"),
        },
        { withCredentials: true }
      );
      fetchReminders();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  const deleteReminder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reminder?"))
      return;

    try {
      await axios.delete(`http://localhost:3000/api/reminder/${id}`, {
        withCredentials: true,
      });
      alert("Deleted Successfully");
      fetchReminders();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDate(dayjs());
    setTime(dayjs());
    setDescription("");
    setErrors({ name: "", date: "", time: "" });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Add Reminder Form */}
        <Card style={{ padding: "20px", flex: 1 }}>
          <Typography variant="h6" color="blue">
            Add Your Reminder
          </Typography>
          <Typography variant="caption" color="blue">
            Reminder added here can be seen in the calendar later.
          </Typography>
          <Divider />
          {errors.name && <Alert severity="error">{errors.name}</Alert>}
          <TextField
            label="Reminder Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />
          {errors.date && <Alert severity="error">{errors.date}</Alert>}
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            minDate={dayjs()}
            error={!!errors.date}
            helperText={errors.date}
          />
          {errors.time && <Alert severity="error">{errors.time}</Alert>}
          <TimePicker
            label="Time"
            value={time}
            onChange={(newValue) => setTime(newValue)}
            error={!!errors.time}
            helperText={errors.time}
          />
          <TextField
            label="Reminder Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <Button
            variant="contained"
            onClick={createReminder}
            style={{ marginTop: "10px", backgroundColor: "#003366" }}
          >
            Submit
          </Button>
        </Card>

        {/* Reminder List */}
        <Card style={{ padding: "20px", flex: 1 }}>
          <Typography variant="h6" color="blue">
            Reminder List
          </Typography>
          <Typography variant="caption" color="textSecondary">
            You can edit your reminder here.
          </Typography>
          <Divider />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reminders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{dayjs(item.date).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>
                    {dayjs(item.time, "HH:mm").format("HH:mm")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="warning"
                      onClick={() => editReminder(item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteReminder(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Edit Reminder Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <Card style={{ padding: "20px" }}>
            <Typography variant="h6" color="blue">
              Edit Your Reminder
            </Typography>
            <Divider />
            <TextField
              label="Reminder Title"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <DatePicker
              label="Date"
              value={editDate}
              onChange={(newValue) => setEditDate(newValue)}
              minDate={dayjs()}
            />
            <TimePicker
              label="Time"
              value={editTime}
              onChange={(newValue) => setEditTime(newValue)}
            />
            <Button
              variant="contained"
              onClick={updateReminder}
              style={{ marginTop: "10px", backgroundColor: "#003366" }}
            >
              Submit
            </Button>
          </Card>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default Reminder;
