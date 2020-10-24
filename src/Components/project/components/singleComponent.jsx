import React, { useState, useEffect, useCallback } from 'react'
import { getComponentActivities } from '../../../services/componentActivitiesService';
import { getComponentRequirements } from '../../../services/componentRequirementsService';
import ActivitiesTable from './activities/activitiesTable';
import RequirementsTable from './requirements/requirementsTable';

function SingleComponent({ comp: component, budget }) {

  const [activities, setActivities] = useState([]);
  const [requirements, setRequirements] = useState([]);

  const populateActivities = useCallback(async() => {
    const { data: activities } =  await getComponentActivities(component.id);
      setActivities(activities);
  },[component])
  const populateRequirements = useCallback(async() =>  {
    const { data: requirements } =  await getComponentRequirements(component.id);
    setRequirements(requirements);
  },[component])

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador    
    /* async function populateActivities() {
      const { data: activities } = await getComponentActivities(component.id);
      setActivities(activities);
    } */
/*     async function populateRequirements() {
      const { data: requirements } = await getComponentRequirements(component.id);
      setRequirements(requirements);
    } */
    console.log('iniciando');
    populateActivities();
    populateRequirements();
  },[populateActivities, populateRequirements]);

 
 
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
      <ActivitiesTable datas={activities} component={component} populateActivities={populateActivities}/>
      <div className="separator"></div>
      {/* table requirement */}
      <RequirementsTable datas={requirements} activities={activities} populateRequirements={populateRequirements} budget={budget}/>
    </div>
  )
}

export default SingleComponent
