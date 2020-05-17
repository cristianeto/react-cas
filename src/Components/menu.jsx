import React from "react";
import Drawer from "@material-ui/core/Drawer";

export default function TemporaryDrawer({ props }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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
