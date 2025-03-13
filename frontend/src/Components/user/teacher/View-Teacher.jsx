import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const Breadcrumb = ({ linkOne, linkTwo, btnName, btnLink }) => (
  <div className="breadcrumb">
    {/* Add your breadcrumb implementation here */}
    <Button href={btnLink} variant="contained" color="primary">
      {btnName}
    </Button>
  </div>
);

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    subject: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const response = await axios.get(`http://localhost:3000/api/teacher`, {
      withCredentials: true,
    });
    setTeachers(response.data.data);
  };

  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:3000/api/teacher/${id}`, {
      withCredentials: true,
    });
    fetchTeachers();
  };

  const editTeacher = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/teacher/${id}`,
      {
        withCredentials: true,
      }
    );
    const { data } = response.data;
    setFormData({
      id: data.id,
      name: data.name,
      subject: data.subject,
      email: data.email,
      phone: data.phone,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(
      `http://localhost:3000/api/teacher/${formData.id}`,
      formData,
      {
        withCredentials: true,
      }
    );
    fetchTeachers();
    setShowEditModal(false);
  };

  return (
    <Container>
      <Breadcrumb
        linkOne="Dashboard"
        linkTwo="View Teacher"
        btnName="Add Teacher"
        btnLink="/user/add-teacher"
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 4 }}>
            <div>
              <Typography variant="h6" color="blue">
                Teacher List
              </Typography>
              <Typography variant="caption" color="blue">
               Teacher details
              </Typography>
              <Divider sx={{ my: 2 }} />
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.address}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => editTeacher(teacher.id)}>
                        <EditIcon color="success" fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => deleteTeacher(teacher.id)}>
                        <CancelIcon color="error" fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Card sx={{ p: 4 }}>
            <div>
              <Typography variant="h6" color="blue">
                Edit Your Teacher
              </Typography>
              <Typography variant="caption" color="blue">
                Teacher can be edited
              </Typography>
              <Divider sx={{ my: 2 }} />
            </div>

            <form onSubmit={handleEditSubmit}>
              <TextField
                fullWidth
                label="Teacher Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Teacher Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Teacher Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="Teacher Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#003366" }}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ViewTeachers;
