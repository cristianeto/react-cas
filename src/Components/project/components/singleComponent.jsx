import React, { useState, useEffect, useCallback } from "react";
import { getComponentActivities } from "../../../services/componentActivitiesService";
import { getComponentRequirements } from "../../../services/componentRequirementsService";
import ActivitiesTable from "./activities/activitiesTable";
import RequirementsTable from "./requirements/requirementsTable";

const SingleComponent = React.memo(({ comp: component, budget }) => {
  console.log("SingleComponent");

  const [activities, setActivities] = useState([]);
  const [requirements, setRequirements] = useState([]);

  const populateActivities = useCallback(async () => {
    const { data: activities } = await getComponentActivities(component.id);
    setActivities(activities);
  }, [component]);
  const populateRequirements = useCallback(async () => {
    const { data: requirements } = await getComponentRequirements(component.id);
    setRequirements(requirements);
  }, [component]);

  useEffect(() => {
    populateActivities();
    populateRequirements();
  }, [populateActivities, populateRequirements]);

  return (
    <div>
      <ActivitiesTable
        datas={activities}
        component={component}
        populateActivities={populateActivities}
      />
      <div className="separator"></div>
      {/* table requirement */}
      <RequirementsTable
        datas={requirements}
        activities={activities}
        populateRequirements={populateRequirements}
        budget={budget}
      />
    </div>
  );
});

export default SingleComponent;
