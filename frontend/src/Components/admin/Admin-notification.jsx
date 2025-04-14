import React, { useState } from "react";
import {
  Card,
  TextareaAutosize,
  Button,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";

const MassNotification = () => {
  const [text, setText] = useState("");

  const submitForm = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/user/sendEmailToUsers`,
        { message: text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Successfully Sent!");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <Container sx={{ padding: 6 }}>
      <Card sx={{ padding: 6 }}>
        <Typography variant="h6" color="primary" align="center">
          Mass Notification
        </Typography>
        <Typography
          variant="caption"
          display="block"
          align="center"
          gutterBottom
        >
          Please fill up the below field and send Mail notification about the
          update
        </Typography>
        <TextareaAutosize
          minRows={4}
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: 10, fontSize: 16, marginTop: 10 }}
        />
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Button variant="contained" color="blue" onClick={submitForm}>
            Send
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default MassNotification;
