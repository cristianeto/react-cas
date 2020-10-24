import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../common/tabPanel';
import { Paper } from '@material-ui/core';
import SingleComponent from './singleComponent';



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProjectComponents({ data: components, budget }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root} elevation={10}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto">
          {components.map((comp, index) =>
            <Tab key={comp.id} label={comp.name} wrapped {...a11yProps(index)} />
          )}

        </Tabs>
      </AppBar>
      {components.map((comp, index) =>
        <TabPanel key={comp.id} value={value} index={index}>
          <SingleComponent comp={comp} budget={budget} />
        </TabPanel>
      )}
    </Paper>
  );
}

export default ProjectComponents;