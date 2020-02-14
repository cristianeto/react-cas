import React from "react";
import { Container, Typography } from "@material-ui/core";
const Welcome = () => {
  return (
    <Container maxWidth="xl" style={{ minHeight: "90vh" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="body1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam non at
        qui quisquam voluptatum voluptatibus optio numquam aspernatur sit libero
        temporibus sunt ea quibusdam, error asperiores. Dolore repudiandae quia
        eum!
      </Typography>
      <Typography variant="body1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam non at
        qui quisquam voluptatum voluptatibus optio numquam aspernatur sit libero
        temporibus sunt ea quibusdam, error asperiores. Dolore repudiandae quia
        eum!
      </Typography>
    </Container>
  );
};

export default Welcome;
