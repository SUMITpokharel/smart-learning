import React, { useState, useEffect } from "react";
import axios from "axios";

import Breadcrum from "./../User-Breadcrum";
import { useParams } from "react-router-dom";

const NoteDetailView = () => {
  // State variables
  const [note, setNote] = useState({});
  const [notesImages, setNotesImages] = useState([]);
  const [quillContent, setQuillContent] = useState("");

  // Extract the note ID from the route parameters
  const { id } = useParams();

  // Fetch note details when the component mounts
  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notes/${id}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setNote(response.data.data);
        setQuillContent(response.data.data.description);
        setNotesImages(response.data.data.notesImages);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchNoteDetails();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      {/* Breadcrumb Component */}
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Note"
        btnName="Add Note"
        btnLink="/user/add-note"
      />

      {/* Main Card */}
      <div
        style={{
          width: "100%",
          padding: "20px",
          marginBottom: "50px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Image Carousel */}
        <div style={{ display: "flex", overflowX: "auto", gap: "10px" }}>
          {notesImages.map((image) => (
            <div key={image.id} style={{ flexShrink: 0 }}>
              <div
                style={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    image.image.split(".").pop() === "docx" ||
                    image.image.split(".").pop() === "pdf"
                      ? "https://media.istockphoto.com/id/1424475110/photo/pdf-file-icon-3d-render-illustration.jpg?b=1&s=170667a&w=0&k=20&c=ckEpkmb0aAP-ThPGssdyXnH-7Slb5dGwUCaoRziCULY="
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png"
                  }
                  alt="Note"
                  style={{ maxHeight: "400px", maxWidth: "100%" }}
                />
              </div>
              <p style={{ textAlign: "center" }}>
                View File:{" "}
                <a href={image.image} target="_blank" rel="noopener noreferrer">
                  Click Here To View
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Note Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h2>{note.title}</h2>
          <p>{note.createdAt?.slice(0, 10)}</p>
        </div>
        <h4>{note.subject}</h4>

        {/* Quill Content */}
        <div
          style={{ marginLeft: "15px", marginTop: "20px" }}
          dangerouslySetInnerHTML={{ __html: quillContent }}
        />
      </div>
    </div>
  );
};

export default NoteDetailView;
