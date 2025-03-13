import React from "react";
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Breadcrum = ({ linkOne, linkTwo, btnName, btnLink }) => {
  return (
    <Container>
      <Grid container alignItems="center">
        <Grid item md={3}>
          <Breadcrumbs separator="-">
            <Typography variant="subtitle2" color="primary">
              {linkOne}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {linkTwo}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item md>
          {/* Spacer */}
        </Grid>
        <Grid item md={3}>
          <Button
            component={Link}
            to={btnLink}
            variant="contained"
            style={{ backgroundColor: "#003366" }}
          >
            {btnName}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Breadcrum;
