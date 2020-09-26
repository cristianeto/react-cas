import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';

function SingleComponent({ comp: component }) {

  const initialState = {
    data: {
      "id": component.id,
      "name": component.name
    },
    meta: {},
    activities: []
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    console.log("my State:", state);
  });

  const handleSubmit = () => {
    console.log("submiting");
  }
  return (
    <div>
      {state.data.name}
      <Button onClick={handleSubmit} color="primary" variant="contained" margin="normal" size="medium">
        Modificar Componente
      </Button>
      {/* info Component */}

      {/* info Meta */}

      {/* table activities with AddButton */}

      {/* table requirement */}
    </div>
  )
}

export default SingleComponent
