import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  Box,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  Close,
} from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Breadcrum from "./User-Breadcrum";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [type, setType] = useState("dayGridMonth");
  const [anchorEl, setAnchorEl] = useState(null);
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const colors = ["#1976d2", "#388e3c", "#d32f2f", "#fbc02d"]; // More colors for variety
    axios
      .get("http://localhost:3000/api/reminder", { withCredentials: true })
      .then((response) => {
        const reminders = response.data.data.map((reminder) => ({
          title: reminder.title,
          start: reminder.date,
          extendedProps: {
            description: reminder.description || "No description",
          },
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setEvents(reminders);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleToday = () => calendarRef.current?.getApi().today();
  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();
  const handleViewChange = (newType) => {
    setType(newType);
    setAnchorEl(null);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      description: info.event.extendedProps?.description || "No description",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Calendar"
        btnName="Add reminder"
        btnLink="/user/reminder"
      />
      <Toolbar>
        <Button variant="outlined" onClick={handleToday}>
          Today
        </Button>
        <Button onClick={handlePrev}>
          <ChevronLeft />
        </Button>
        <Button onClick={handleNext}>
          <ChevronRight />
        </Button>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Calendar
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ExpandMore />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {type === "dayGridMonth"
            ? "Month"
            : type === "timeGridWeek"
            ? "Week"
            : "Day"}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleViewChange("dayGridMonth")}>
            Month
          </MenuItem>
          <MenuItem onClick={() => handleViewChange("timeGridWeek")}>
            Week
          </MenuItem>
          <MenuItem onClick={() => handleViewChange("timeGridDay")}>
            Day
          </MenuItem>
        </Menu>
      </Toolbar>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView={type}
        events={events}
        eventClick={handleEventClick}
      />

      {/* Enhanced Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: "500px",
            margin: "auto",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            padding: "16px 24px",
          }}
        >
          <Typography variant="h6">{selectedEvent?.title}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "24px",
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {selectedEvent?.description}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid #e0e0e0",
            padding: "16px 24px",
          }}
        >
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          {/* Optional: Add more actions like Edit or Delete */}
          {/* <Button color="secondary">Edit</Button> */}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CalendarComponent;
