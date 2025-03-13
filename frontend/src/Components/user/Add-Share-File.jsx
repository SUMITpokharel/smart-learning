import React, { useState, useEffect } from "react";
import axios from "axios";

const FileShareForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/user/getAllUsers`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.users);
    };

    fetchUsers();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      await axios.post(
        `http://localhost:3000/api/shareFile/save-shareFile`,
        formData,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Successfully Added");
      // Redirect to another page after success
      window.location.href = "/user/share-file";
    } catch (error) {
      console.error("Error sharing file:", error);
      alert("An error occurred while adding the file.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-3">
            <p className="text-success h6 pb-0 mb-0" color="blue">
              Add Share File
            </p>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Title</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength="150"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength="200"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload your Documents here</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*, .pdf, .doc, .docx"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="userId">Share With</label>
                <select
                  id="userId"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                >
                  <option value="">Select User</option>
                  {user.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-success mt-3"
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

export default FileShareForm;
