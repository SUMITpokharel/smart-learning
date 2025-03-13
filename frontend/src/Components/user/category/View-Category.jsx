import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Typography,
  Divider,
  Button,
  Dialog,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrum from "../User-Breadcrum";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [notesCategories, setNotesCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [categoryID, setCategoryID] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`http://localhost:3000/api/category`, {
        withCredentials: true,
      });
      setCategories(response.data.data);
      setNotesCategories(response.data.notesCategories);
    };
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    await axios.delete(`http://localhost:3000/api/category/${id}`, {
      withCredentials: true,
    });
    alert("Deleted Successfully");
    const response = await axios.get(`http://localhost:3000/api/category`, {
      withCredentials: true,
    });
    setCategories(response.data.data);
  };

  const deleteNotesCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notes category?"))
      return;
    await axios.delete(
      `http://localhost:3000/api/category/notesCategories/${id}`,
      { withCredentials: true }
    );
    alert("Deleted Successfully");
    const response = await axios.get(`http://localhost:3000/api/category`, {
      withCredentials: true,
    });
    setNotesCategories(response.data.notesCategories);
  };

  const editCategory = async (id, type) => {
    setShowModal(true);
  
    const url =
      type === "notes"
        ? `http://localhost:3000/api/category/notesCategories/${id}`
        : `http://localhost:3000/api/category/${id}`;
  
    try {
      const response = await axios.get(url, { withCredentials: true });
  
      console.log("API Response:", response.data); // Log full response
  
      if (!response.data || !response.data.data) {
        console.error("Invalid response data:", response.data);
        alert("Error fetching category data.");
        return;
      }
  
      setEditName(response.data.data.name);
      setCategoryID(id);
    } catch (error) {
      console.error("Error fetching category:", error);
      alert("Failed to fetch category data. Please try again.");
    }
  };
  

  const handleEditCategory = async () => {
    await axios.patch(
      `http://localhost:3000/api/category/${categoryID}`,
      { name: editName },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    const response = await axios.get(`http://localhost:3000/api/category`, {
      withCredentials: true,
    });
    setCategories(response.data.data);
    setShowModal(false);
  };

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Breadcrum
          linkOne="Dashboard"
          linkTwo="View Category"
          btnName="Add Category"
          btnLink="/user/add-category"
        />
      </div>

      <Card style={{ padding: "20px" }}>
        <Typography variant="h6" color="blue">
          Category List
        </Typography>
        <Typography variant="caption" color="blue">
          Find all the categories you have posted
        </Typography>
        <Divider style={{ marginBottom: "10px" }} />

        {/* Tasks Categories Table */}
        <div>
          <Typography variant="body1" color="blue">
            Tasks Category
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => editCategory(item.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteCategory(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Notes Categories Table */}
        <div style={{ marginTop: "20px" }}>
          <Typography variant="body1" color="blue">
            Notes Category
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notesCategories.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => editCategory(item.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteNotesCategory(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>

      {/* Edit Category Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <Card style={{ padding: "20px" }}>
          <Typography variant="h6" color="blue">
            Edit Your Category
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Updated category name will reflect in the list.
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <TextField
            fullWidth
            label="Category Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "10px", backgroundColor: "#003366" }}
            onClick={handleEditCategory}
          >
            Submit
          </Button>
        </Card>
      </Dialog>
    </Container>
  );
};

export default CategoryList;
