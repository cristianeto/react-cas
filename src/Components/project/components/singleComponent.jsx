import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getComponentActivities } from '../../../services/componentActivities';
import ActivitiesTable from './activities/activitiesTable';

function SingleComponent({ comp: component }) {

  const initialState = {
    data: {
      "id": component.id,
      "name": component.name
    },
    meta: {},
  };
  const [state, setState] = useState(initialState);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador    
    async function fetchActivities() {
      const { data: activities } = await getComponentActivities(state.data.id);
      console.log(activities);
      setActivities(activities);
    }
    fetchActivities();
  }, [state.data.id]);

  const handleSubmit = () => {
    console.log("submiting");
  }

  console.log("activities: ", activities)
  return (
    <div>
      <Typography variant="body2" gutterBottom>
        {state.data.name}

      </Typography>
      <Button onClick={handleSubmit} color="primary" variant="contained" margin="normal" size="medium">
        Modificar Componente
      </Button>
      {/* info Component */}

      {/* info Meta */}

      {/* table activities with AddButton */}
      <ActivitiesTable datas={activities} />

      {/* table requirement */}
    </div>
  )
}

export default SingleComponent
