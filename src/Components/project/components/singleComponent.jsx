import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { getComponentActivities } from '../../../services/componentActivities';
import { getComponentRequirements } from '../../../services/componentRequirements';
import ActivitiesTable from './activities/activitiesTable';
import RequirementsTable from './requirements/requirementsTable';

function SingleComponent({ comp: component }) {

  const initialState = {
    data: {
      "id": component.id,
      "name": component.name
    },
    meta: {},
  };
  //const [state, setState] = useState(initialState);
  const [activities, setActivities] = useState([]);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador    
    async function populateActivities() {
      const { data: activities } = await getComponentActivities(component.id);
      setActivities(activities);
    }
    async function populateRequirements() {
      const { data: requirements } = await getComponentRequirements(component.id);
      setRequirements(requirements);
    }
    populateActivities();
    populateRequirements();
  }, [component.id]);

  const handleSubmit = () => {
    console.log("submiting");
  }

  console.log("activities: ", activities)
  return (
    <div>
      {/*       <Typography variant="body2" gutterBottom>
        {state.data.name}

      </Typography> */}
      {/* <Button onClick={handleSubmit} color="primary" variant="contained" margin="normal" size="medium">
        Modificar Componente
      </Button> */}
      {/* info Component */}

      {/* info Meta */}

      {/* table activities with AddButton */}
      <ActivitiesTable datas={activities} />

      {/* table requirement */}
      <RequirementsTable datas={requirements} />
    </div>
  )
}

export default SingleComponent
