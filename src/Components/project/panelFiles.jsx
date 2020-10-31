import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Dropzone from 'react-dropzone-uploader'
import { Paper } from "@material-ui/core";
import { getProjectResolution } from '../../services/projectFileServices';

import 'react-dropzone-uploader/dist/styles.css'


const PanelFiles = ({ projectSlug }) => {
  const apiEndPoint = process.env.REACT_APP_API_URL;

  const [resolution, setResolution] = useState(projectSlug);
  const { enqueueSnackbar } = useSnackbar();

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: `${apiEndPoint}/projects/${projectSlug}/resolution` } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, remove, file }, status, fileWithMeta) => {
    if (status === 'done') {
      enqueueSnackbar(`${meta.name} fue subido correctamente! Detalle: ${fileWithMeta[0].xhr.response}`, { variant: 'success' });
      setResolution(JSON.parse(fileWithMeta[0].xhr.response));
      remove();
    }
    else if (status === 'aborted') {
      enqueueSnackbar(`${meta.name} no se subió! Detalle: ${fileWithMeta[0].xhr.response}`, { variant: 'error' });
    } else if (status === 'error_file_size') {
      enqueueSnackbar(`Error! Detalle: Tamaño máximo permitido es 2MB.`, { variant: 'error' });
    } else if (status === 'error_upload') {
      enqueueSnackbar(`Error! Detalle: Tamaño máximo permitido es 2MB y debe ser PDF.`, { variant: 'error' });
    } else if (status === 'rejected_file_type') {
      enqueueSnackbar(`${meta.name} no se subió! Detalle: Solo se aceptan archivos en formato PDF`, { variant: 'error' });
    }
  }

  // receives array of files that are done uploading when submit button is clicked
  /*   const handleSubmit = (files, allFiles) => {
  
      console.log("handleSubmit: ", files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
    const Preview = ({ meta }) => {
      const { name, percent, status } = meta
      return (
        <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
          {name}, subido al {Math.round(percent)}%, {status}
        </span>
      )
    } */


  useEffect(() => {
    const populateResolution = async () => {
      const { data: project } = await getProjectResolution(projectSlug);
      setResolution(project.resolution);
    }
    populateResolution();
  }, [projectSlug]);


  const handleOpenPDF = (event) => {
    event.preventDefault();
    if (resolution !== null) window.open(resolution);
  }
  return (
    <Paper className="paper">
      <h2>Resolución: </h2>
      <Link to="#" onClick={handleOpenPDF}>{resolution === null ? 'No existe ningun archivo' : 'Abrir PDF'}</Link>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
        inputContent="Arrastra el pdf aquí para subirlo"
        maxSizeBytes={2000000} // 2MB          
        accept="application/pdf"
      />
      {/* <List dense={true}>
        {statuses.map(projectStatus =>
          <ListItem key={projectStatus.id}>
            <ListItemText
              primary={`${projectStatus.status.name} por ${projectStatus.user.fullname}`}
              secondary={
                <Tooltip title={projectStatus.created_at} placement="top">
                  <span>{projectStatus.human_created_at}</span>
                </Tooltip>
              }
            />
          </ListItem>
        )}
      </List> */}
      {/* <NavLink to={`/proyecto/${projectSlug}/estados`} style={{ textDecoration: "none" }}>
        <Button
          className="btn btn-guardar"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Ver más
                  </Button>
      </NavLink> */}
    </Paper>
  );
};

export default PanelFiles;
