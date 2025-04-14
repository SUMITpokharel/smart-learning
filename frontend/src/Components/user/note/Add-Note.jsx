import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editor, EditorState, ContentState, convertFromHTML } from "draft-js";
import "draft-js/dist/Draft.css";

const AddNote = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [valid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editorState, setEditorState] = useState(() => {
    // Initialize editorState based on the description
    if (description) {
      const blocksFromHTML = convertFromHTML(description); // Convert HTML to DraftJS blocks
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty(); // Default to empty editor
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/category/notesCategories`,
          { withCredentials: true }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    const html = state.getCurrentContent().getPlainText(); // For plain text
    setDescription(html); // Update the description state
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", name);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("categoryId", categoryId);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/notes`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Successfully Added");
        window.location.href = "/user/view-note";
      }
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Add Your Notes Here
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Note Title */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Note Title"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Subject */}
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* Rich Text Editor */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            minHeight: "150px",
          }}
        >
          <Editor editorState={editorState} onChange={handleEditorChange} />
        </div>

        {/* File Upload */}
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          accept="image/*, .pdf, .doc, .docx"
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!valid}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: valid ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: valid ? "pointer" : "not-allowed",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;