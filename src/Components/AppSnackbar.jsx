import React, { createRef } from 'react';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';

const notistackRef = createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const AppSnackbar = ({ children }) => {
  return (
    <SnackbarProvider
      //preventDuplicate
      maxSnack={3}
      ref={notistackRef}
      action={(key) => (
        <Button onClick={onClickDismiss(key)} style={{ color: '#fff' }}>
          CERRAR
        </Button>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackbar;
