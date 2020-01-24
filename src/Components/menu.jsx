import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer({ props }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  return (
    <div>
      <Drawer
        open={state.left}
        onClose={() => this.props.onToggleDrawer("left", false)}
      >
        {() => this.props.onSideList("left")}
      </Drawer>
    </div>
  );
}
