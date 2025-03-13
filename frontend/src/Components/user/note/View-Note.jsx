import React, { useState, useEffect } from "react";
import axios from "axios";
// Import useHistory for navigation
import Breadcrum from "./../User-Breadcrum";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  // Initialize useHistory for navigation

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(`http://localhost:3000/api/notes`, {
      withCredentials: true,
    });
    setNotes(response.data.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/category/notesCategories`,
      { withCredentials: true }
    );
    setCategories(response.data.categories);
  };

  const getNotesByCategory = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/notes/getNotesByCategoryId/${id}`,
      { withCredentials: true }
    );
    setNotes(response.data.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:3000/api/notes/${id}`, {
      withCredentials: true,
    });
    setNotes(notes.filter((note) => note.id !== id));
  };

 

  const handleImageClick = (imageUrl) => {
    // Open the image/document in a new tab
    window.open(imageUrl, "_blank");
  };

  return (
    <div className="container">
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Note"
        btnName="Add Note"
        btnLink="/user/add-note"
      />

      <div className="row">
        <div className="col-md-12" style={{ marginLeft: "30px" }}>
          <div className="search">
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                getNotesByCategory(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {notes.map((note) => (
          <div className="col-md-4" key={note.id}>
            <div className="card mx-auto" style={{ maxWidth: "344px" }}>
              <div className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {note.notesImages.map((image, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={image.id}
                    >
                      <div
                        className="card-img-top d-flex justify-content-center align-items-center"
                        style={{ height: "200px", cursor: "pointer" }} // Add cursor pointer
                        onClick={() => handleImageClick(image.image)} // Add onClick handler
                      >
                        <img
                          src={
                            image.image.split(".").pop() === "docx" ||
                            image.image.split(".").pop() === "pdf"
                              ? "https://media.istockphoto.com/id/1424475110/photo/pdf-file-icon-3d-render-illustration.jpg?b=1&s=170667a&w=0&k=20&c=ckEpkmb0aAP-ThPGssdyXnH-7Slb5dGwUCaoRziCULY="
                              : image.image // Use the actual image URL if it's not a document
                          }
                          alt="Note"
                          style={{ height: "400px" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">
                  <a href={`/user/view-note/${note.id}`}>{note.title}</a>
                </h5>
                <p className="card-text">{note.subject}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{
                      position: "absolute",
                      top: "4%",
                      right: "0",
                      width: "70px",
                      transform: "translateY(-50%)",
                      backgroundColor: "red",
                    }}
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      position: "absolute",
                      top: "4%",
                      left: "0",
                      width: "70px",
                      transform: "translateY(-50%)",
                      backgroundColor: "blue",
                    }}
                    // Add onClick handler for Edit
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;