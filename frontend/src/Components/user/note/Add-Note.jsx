import React, { useState, useEffect } from "react";
import axios from "axios";
// Change to your config file path
import { Editor, EditorState } from "draft-js";
import { convertFromHTML, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const AddNote = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [valid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editorState, setEditorState] = useState(
    description
      ? EditorState.createWithContent(convertFromHTML(description))
      : EditorState.createEmpty()
  );

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/category/notesCategories`,{
            withCredentials: true,}
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Update description state when editor content changes
  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    // eslint-disable-next-line no-unused-vars
    const rawContent = convertToRaw(content);
    const html = state.getCurrentContent().getPlainText(); // For plain text
    setDescription(html); // Update the description state
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', name);
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('categoryId', categoryId);
  
    // Convert FileList to an array and append files if any
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      const response = await axios.post(`http://localhost:3000/api/notes`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        alert('Successfully Added');
        // Redirect after successful submission
        window.location.href = '/user/view-note';
      }
    } catch (error) {
      console.error('Error submitting note:', error);
    }
  };
  
  return (
    <div>
      <h2>Add Your Notes Here</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Note Title */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Note Title"
          required
        />

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" >
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
        />

        {/* Rich Text Editor */}
        <div>
          <Editor editorState={editorState} onChange={handleEditorChange} />
        </div>

        {/* File Upload */}
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          accept="image/*, .pdf, .doc, .docx"
        />

        {/* Submit Button */}
        <button type="button" onClick={handleSubmit} disabled={!valid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
