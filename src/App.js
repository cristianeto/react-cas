import React, { Component } from "react";
import { CasClient } from "./CasClient/CasClient";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asd: "asas"
    };
  }

  async componentDidMount() {
    //if (this.props.location.pathname === '/callback') return;
    let ClientCAS = new CasClient();
    try {
      if (!ClientCAS.getLogin()) {
        ClientCAS.saveTicket();
        await ClientCAS.verificaLogin().then();
      }
      console.log("Pasando...");

      if (ClientCAS.isAuthenticated() && ClientCAS.getLogin()) {
        this.ObtenerDatosCentralizada();
      }
      //this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log("error: " + err);
    }
  }

  render() {
    return <div>Redirigiendo...</div>;
  }
}
