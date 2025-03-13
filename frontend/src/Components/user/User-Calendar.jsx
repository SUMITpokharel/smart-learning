import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Breadcrum from "./User-Breadcrum";

const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [type, setType] = useState("dayGridMonth");
  const [anchorEl, setAnchorEl] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const colors = ["blue"];
    axios
      .get("http://localhost:3000/api/reminder", { withCredentials: true })
      .then((response) => {
        const reminders = response.data.data.map((reminder) => ({
          title: reminder.title,
          start: reminder.date,
          extendedProps: {
            description: reminder.description || "No description",
          }, // ✅ Fix: Prevent undefined
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setEvents(reminders);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []); // ✅ Fix: Run only once on mount

  const handleToday = () => calendarRef.current?.getApi().today();
  const handlePrev = () => calendarRef.current?.getApi().prev();
  const handleNext = () => calendarRef.current?.getApi().next();
  const handleViewChange = (newType) => {
    setType(newType);
    setAnchorEl(null);
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
        eventClick={(info) => {
          alert(
            `${info.event.title}\n${
              info.event.extendedProps?.description || "No description"
            }`
          );
        }}
      />
    </Container>
  );
};

export default CalendarComponent;
