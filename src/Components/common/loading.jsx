import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ open }) => {
  return (
    <Backdrop style={{ zIndex: 1000, color: '#fff' }} open={open}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default Loading;