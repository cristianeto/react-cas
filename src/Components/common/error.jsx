import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Error = (props) => {
  return (
    <Container maxWidth="xl">
      <h1>{props.title}</h1>
      <Typography variant="subtitle1" gutterBottom>
        {props.description}
      </Typography>
      <address>
        <Typography variant="caption" display="block" gutterBottom>
          Tu puedes contactar al desarrollador en su{' '}
          <Link
            to="https://cristianeto.github.com"
            target="_blank"
            onClick={(event) => { event.preventDefault(); window.location.assign('https://cristianeto.github.com') }} >
            Página web
          </Link>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          O puedes enviar un e-mail a <a href="mailto:cristian.guaman@icloud.com">contacta al administrador</a>
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Es posible que quieras visitarnos: Riobamba, Ecuador, Panamericana Sur Km 1 1/2
        </Typography>
      </address>
    </Container>
  );
}

export default Error;