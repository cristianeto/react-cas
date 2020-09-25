import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <SnackbarProvider
    //preventDuplicate
    maxSnack={3}
    ref={notistackRef}
    action={(key) => (
      <Button onClick={onClickDismiss(key)} style={{ color: "#fff" }}>
        CERRAR
      </Button>
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
