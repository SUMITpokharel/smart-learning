import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrum from "./User-Breadcrum";

const FileShareForm = () => {
  // State variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/getAllUsers`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
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
      window.location.href = "/user/share-file";
    } catch (error) {
      console.error("Error sharing file:", error);
      alert("An error occurred while adding the file.");
    }
  };

  return (
    <div className="container">
      {/* Breadcrumb */}
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Add Sharefile"
        btnName="View Sharefile"
        btnLink="/user/share-file"
      />

      {/* Main Form Container with additional spacing */}
      <div className="row justify-content-center mt-5">
        {" "}
        {/* Added mt-5 for top margin */}
        <div className="col-md-6">
          <div className="card p-3">
            <p className="text-success h6 pb-0 mb-3">Add Share File</p>
            <hr />

            {/* Form */}
            <form onSubmit={handleSubmit} className="form-group-spacing">
              {/* Title Input */}
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
                  maxLength="150"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
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

              {/* File Upload Input */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload your Documents here
                </label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*, .pdf, .doc, .docx"
                  required
                />
              </div>

              {/* User Selection Dropdown */}
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  Share With
                </label>
                <select
                  id="userId"
                  className="form-select"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-success mt-3"
                style={{ backgroundColor: "#003366", color: "white" }}
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
