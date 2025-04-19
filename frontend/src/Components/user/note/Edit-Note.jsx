import React, { useState, useEffect } from "react";
import axios from "axios";

const EditNote = () => {
  // State variables
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState(""); // Plain text description
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);

  // Fetch note details and categories on component mount
  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const id = window.location.pathname.split("/").pop(); // Extract ID from URL
        const response = await axios.get(
          `http://localhost:3000/api/notes/${id}`,
          {
            withCredentials: true,
          }
        );
        const noteData = response.data.data;
        setName(noteData.title);
        setSubject(noteData.subject);
        setDescription(noteData.description);

        // Fetch categories
        const categoriesResponse = await axios.get(
          `http://localhost:3000/api/category/notesCategories`,
          { withCredentials: true }
        );
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("Error fetching note or categories:", error);
      }
    };

    fetchNoteDetails();
  }, []);

  // Form validation
  const validate = () => {
    if (!name || !subject || !description || !categoryId) {
      alert("All fields are required!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const id = window.location.pathname.split("/").pop(); // Extract ID from URL
      const formData = new FormData();
      formData.append("title", name);
      formData.append("subject", subject);
      formData.append("description", description); // Plain text description
      formData.append("categoryId", categoryId);

      // Append files
      files.forEach((file) => {
        formData.append("files", file);
      });

      // Send API request to update the note
      const response = await axios.post(
        `http://localhost:3000/api/notes/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully Edited Note");
        window.location.href = "/user/view-note"; // Redirect to view notes
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to edit note. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "50%",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div>
            <p style={{ color: "green", fontSize: "20px", marginBottom: "0" }}>
              Edit Note
            </p>
            <span style={{ fontSize: "14px", color: "grey" }}>
              Notes that you can read for later use.
            </span>
            <hr />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <label htmlFor="name">Note Title</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength="50"
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            {/* Category */}
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Subject */}
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength="80"
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            {/* File Upload */}
            <label htmlFor="files">Upload Documents</label>
            <input
              type="file"
              id="files"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            {/* Description (Plain Textarea) */}
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!name || !subject || !description || !categoryId}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
