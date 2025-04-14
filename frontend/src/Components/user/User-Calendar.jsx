import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,

  Box,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandMore,
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
        <Box sx={{ backgroundColor: "#1976d2", padding: "16px" }}>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontWeight: 600, fontSize: "1.2rem" }}
          >
            {selectedEvent?.title}
          </Typography>
        </Box>
        <DialogContent
          sx={{
            padding: "24px",
            "& pre": {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            },
          }}
        >
          <Typography variant="body1">{selectedEvent?.description}</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid #e0e0e0",
            padding: "16px 24px",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CalendarComponent;
