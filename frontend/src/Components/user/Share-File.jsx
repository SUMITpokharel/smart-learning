import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrum from "./User-Breadcrum";

import {
  Container,
  Card,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Visibility, Edit, Cancel, Download } from "@mui/icons-material";

const ShareFileList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/shareFile/shareFile`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching shared files:", error);
      }
    };
    fetchData();
  }, []);

  const deleteShareFile = async (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await axios.delete(`http://localhost:3000/api/shareFile/delete/${id}`, {
          withCredentials: true,
        });
        alert("Successfully Deleted");
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const editShareFile = (id) => {
    navigate(`/user/edit-share-file/${id}`);
  };
  const handleDownload = (id, title) => {
    window.open(`http://localhost:3000/api/shareFile/download/${id}`, "_blank");
  };
  return (
    <Container>
      <Breadcrum
        linkOne="Dashboard"
        linkTwo="Share File"
        btnName="Add Share File"
        btnLink="/user/add-share-file"
      />

      <Card sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h6" color="blue">
          Share File List
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Share With</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.user.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>
                    <IconButton
                      component="a"
                      href={item.file}
                      target="_blank"
                      color="primary"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      onClick={() => editShareFile(item.id)}
                      color="secondary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteShareFile(item.id)}
                      color="warning"
                    >
                      <Cancel />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDownload(item.id, item.title)}
                      color="success"
                    >
                      <Download />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default ShareFileList;
