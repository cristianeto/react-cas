import React from "react";
import { Container, TextField } from "@material-ui/core";

const Groupform = ({ match, history }) => {
  return (
    <Container maxWidth="xl">
      <h1>Group Form {match.params.id}</h1>

      <form noValidate autoComplete="off">
        <div>
          <TextField id="standard-search" label="Search field" type="search" />
        </div>
      </form>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </Container>
  );
};

export default Groupform;
