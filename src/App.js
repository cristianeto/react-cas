import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { CasClient } from "./CasClient/CasClient";
import NavBar from "./Components/navBar";
import NotFound from "./Components/notFound";
import ResearchGroups from "./Components/researchGroups";
import GroupForm from "./Components/groupForm";
import Welcome from "./Components/welcome";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asd: "asas"
    };
  }

  async componentDidMount() {
    //if (this.props.location.pathname === '/callback') return;
    /*  let ClientCAS = new CasClient();
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
    } */
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {/* <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} /> */}
          <Route path="/welcome" component={Welcome} />
          <Route path="/grupos-investigacion" component={ResearchGroups} />
          <Route path="/grupo/:id" component={GroupForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/welcome" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}
