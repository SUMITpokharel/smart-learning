import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editor, EditorState, ContentState, convertFromHTML } from "draft-js";
import "draft-js/dist/Draft.css";
import Breadcrum from "../User-Breadcrum"; // Import the Breadcrum component

const AddNote = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editorState, setEditorState] = useState(() => {
    if (description) {
      const blocksFromHTML = convertFromHTML(description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
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
    const html = state.getCurrentContent().getPlainText();
    setDescription(html);
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
    <div className="container">
      {/* Breadcrumb */}
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Notes"
        btnName="View Notes"
        btnLink="/user/view-note"
      />

      {/* Main Form Container with additional spacing */}
      <div className="row justify-content-center mt-4">
        {" "}
        {/* Added mt-5 for top margin */}
        <div className="col-md-6">
          <div className="card p-3">
            <p className="text-success h6 pb-0 mb-3">Add Your Notes Here</p>
            <hr />

            <form
              onSubmit={(e) => e.preventDefault()}
              className="form-group-spacing"
            >
              {/* Note Title */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Note Title"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">
                  Category
                </label>
                <select
                  id="categoryId"
                  className="form-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="" enabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="form-control"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  required
                />
              </div>

              {/* Description (Rich Text Editor) */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                    minHeight: "150px",
                  }}
                >
                  <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-3">
                <label htmlFor="files" className="form-label">
                  Upload Files
                </label>
                <input
                  type="file"
                  id="files"
                  className="form-control"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  accept="image/*, .pdf, .doc, .docx"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-3"
                style={{ backgroundColor: "#003366" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
