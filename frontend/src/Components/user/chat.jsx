import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Reference to the chat box container
  const chatBoxRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chat", { withCredentials: true })
      .then((res) => {
        console.log("User fetched:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    socket.emit("loadMessages");

    const handleChatHistory = (data) => setMessages(data);
    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      showNotification(newMessage);
    };

    // Cleanup existing listeners
    socket.off("chatHistory", handleChatHistory);
    socket.off("receiveMessage", handleReceiveMessage);

    // Attach new ones
    socket.on("chatHistory", handleChatHistory);
    socket.on("receiveMessage", handleReceiveMessage);

    // Also return cleanup on unmount
    return () => {
      socket.off("chatHistory", handleChatHistory);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [user]);

  // Automatically scroll to the bottom of the chat box when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a message
  const sendMessage = async () => {
    if (!user || !user.id) {
      console.error("User not logged in or invalid user ID");
      return;
    }

    if (!message.trim()) {
      console.error("Message cannot be empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/chat/send", {
        userId: user.id,
        message,
      });
      socket.emit("sendMessage", res.data);
      setMessage("");
    } catch (error) {
      console.error("Error:", error.response?.data);
    }
  };

  // Show browser notification
  const showNotification = (msg) => {
    if (Notification.permission === "granted") {
      new Notification("New Message", {
        body: `${msg.user.name}: ${msg.message}`,
        icon: msg.user.image || "https://via.placeholder.com/40",
      });
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Chat</h2>
      {!user ? (
        <p>Loading user...</p>
      ) : (
        <>
          <div
            ref={chatBoxRef}
            style={{
              ...styles.chatBox,
              overflowY: "auto",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.user.id === user.id
                    ? styles.myMessageContainer
                    : styles.otherMessageContainer
                }
              >
                <div
                  style={
                    msg.user.id === user.id
                      ? styles.myMessageBubble
                      : styles.otherMessageBubble
                  }
                >
                  <strong style={styles.senderName}>{msg.user.name}:</strong>{" "}
                  {msg.message}
                  <div style={styles.timestamp}>
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "5px",
  },
  chatBox: {
    width: "80%",
    height: "70%",
    padding: "5px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "inset 0px 0px 5px rgba(0,0,0,0.1)",
    scrollbarWidth: "thin",
  },
  myMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "5px",
  },
  otherMessageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "5px",
  },
  myMessageBubble: {
    maxWidth: "75%",
    padding: "10px 15px",
    backgroundColor: "#DCF8C6",
    borderRadius: "15px",
    wordBreak: "break-word",
    position: "relative",
  },
  otherMessageBubble: {
    maxWidth: "75%",
    padding: "10px 15px",
    backgroundColor: "#EAEAEA",
    borderRadius: "15px",
    wordBreak: "break-word",
    position: "relative",
  },
  senderName: {
    fontWeight: "bold",
    marginRight: "5px",
    color: "#007bff",
  },
  inputContainer: {
    display: "flex",
    width: "80%",
    marginTop: "5px",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 15px",
    borderRadius: "20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  timestamp: {
    fontSize: "12px",
    color: "#888",
    marginTop: "5px",
    textAlign: "right",
  },
};

export default Chat;
