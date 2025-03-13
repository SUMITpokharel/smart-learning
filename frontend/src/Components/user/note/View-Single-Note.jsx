import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrum from './../User-Breadcrum';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const fetchNotesAndCategories = async () => {
      try {
        // Fetching all notes and categories on page load
        const notesResponse = await axios.get('http://localhost:3000/api/notes', { withCredentials: true });
        const categoriesResponse = await axios.get('http://localhost:3000/api/category/notesCategories', { withCredentials: true });

        setNotes(notesResponse.data.data); // Set the fetched notes
        setCategories(categoriesResponse.data.categories); // Set the fetched categories
      } catch (error) {
        console.error("Error fetching notes or categories:", error);
      }
    };

    fetchNotesAndCategories();
  }, []);

  const getNotesByCategory = async (id) => {
    if (!id) {
      return; // Don't fetch if no category is selected
    }
    
    try {
      console.log(`Fetching notes for category id: ${id}`);
      const response = await axios.get(`http://localhost:3000/api/notes/getNotesByCategoryId/${id}`, { withCredentials: true });
      console.log('Notes fetched:', response.data.data);
      setNotes(response.data.data); // Update notes state with the fetched data
    } catch (error) {
      console.error("Error fetching notes by category:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
    getNotesByCategory(selectedCategoryId); // Fetch notes when category changes
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`, { withCredentials: true });
      setNotes(notes.filter(note => note.id !== id)); // Remove the deleted note from state
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = (id) => {
    // Navigate to the edit page
    window.location.href = `/user/edit-note/${id}`;
  };

  return (
    <div>
      <Breadcrum linkOne="Dashboard" linkTwo="Note" btnName="Add Note" btnLink="/user/add-note" />

      <div style={{ marginLeft: "30px" }}>
        <select 
          value={categoryId} 
          onChange={handleCategoryChange} 
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {notes.map(note => (
          <div key={note.id} style={{ margin: '10px', width: '344px' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
              <div style={{ overflow: 'hidden', height: '200px', textAlign: 'center' }}>
                {note.notesImages && note.notesImages.map(image => (
                  <div key={image.id} style={{ display: 'inline-block', width: '100%' }}>
                    {image.image.split('.').pop() === 'docx' || image.image.split('.').pop() === 'pdf' ? (
                     <img
                     src="https://media.istockphoto.com/id/1424475110/photo/pdf-file-icon-3d-render-illustration.jpg?b=1&s=170667a&w=0&k=20&c=ckEpkmb0aAP-ThPGssdyXnH-7Slb5dGwUCaoRziCULY="
                     alt="PDF or Word document icon"
                     style={{ height: '100%' }}
                   />
                   ) : (
                   <img
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1156px-Picture_icon_BLACK.svg.png"
                     alt="Placeholder icon for images"
                     style={{ height: '100%' }}
                   />
                   )}
                   
                  </div>
                ))}
              </div>
              <div>
                <Link to={`/user/view-note/${note.id}`}>
                  <h3>{note.title}</h3>
                </Link>
                <p>{note.subject}</p>

                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    position: 'absolute',
                    top: '4%',
                    right: '0',
                    width: '70px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'red',
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => editNote(note.id)}
                  style={{
                    position: 'absolute',
                    top: '4%',
                    left: '0',
                    width: '70px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'blue',
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
