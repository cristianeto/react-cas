import React, { Component } from 'react';
import { TEXT_LABELS } from '../../common/configTable';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  LinearProgress,
  Typography,
  Tooltip,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import auth from '../../../auth/authService';

class MembersTable extends Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {},
        },
        MuiIconButton: {
          sizeSmall: {
            // Adjust spacing to reach minimal touch target hitbox
            marginLeft: 4,
            marginRight: 4,
            padding: 12,
          },
        },
      },
      props: {
        MuiTable: {
          size: 'small',
        },
      },
    });

  getStatus = (value) => {
    if (value === 1) {
      return 'Activo';
    }
  };
  render() {
    const { members, staffs, onLoading, onChange, onDelete } = this.props;
    const columns = [
      {
        name: 'count',
        label: 'ID',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
        },
      },
      {
        name: 'project_id',
        label: 'Proyecto',
        options: {
          filter: false,
          display: 'excluded',
        },
      },
      {
        name: 'project.slug',
        label: 'Slug',
        options: {
          filter: false,
          display: 'excluded',
        },
      },
      {
        name: 'user_id',
        label: 'Usuario',
        options: {
          filter: false,
          display: 'excluded',
        },
      },
      {
        name: 'staff_id',
        label: 'Staff',
        options: {
          filter: false,
          display: 'excluded',
        },
      },
      {
        name: 'created_at',
        label: 'Fecha Creación',
        options: {
          filter: false,
          display: 'excluded',
        },
      },
      {
        name: 'user.fullname',
        label: 'Nombre',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: 'human_created_at',
        label: 'Miembro desde',
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <Tooltip
                title={`${tableMeta.rowData[5]}`}
                style={{ cursor: 'pointer' }}
              >
                <span>{`${value}`}</span>
              </Tooltip>
            );
          },
        },
      },
      {
        name: 'staff',
        label: 'Cargo',
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return value.id !== 1 || auth.getSelectedRole().id === 1 ? (
              <Autocomplete
                name={'staff'}
                options={staffs}
                getOptionLabel={(staff) => staff.name}
                disableClearable
                style={{ width: 300 }}
                value={value}
                getOptionSelected={(staff, value) => {
                  return staff.id === value.id;
                }}
                onChange={(event, newValue) =>
                  onChange(
                    event,
                    newValue,
                    'staff_id',
                    tableMeta.rowData[2],
                    tableMeta.rowData[3]
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin='normal'
                    size='small'
                    label='Cargo en el proyecto'
                    variant='outlined'
                    style={{ margin: '.25em' }}
                  />
                )}
              />
            ) : (
              <span style={{ marginLeft: '1em' }}>{value.name}</span>
            );
          },
        },
      },
      {
        name: '',
        label: 'Acciones',
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return tableMeta.rowData[4] !== 1 ? (
              <Tooltip title='Eliminar' style={{ cursor: 'pointer' }}>
                <DeleteIcon
                  onClick={() =>
                    onDelete(tableMeta.rowData[2], tableMeta.rowData[3])
                  }
                  color={'primary'}
                />
              </Tooltip>
            ) : (
              ''
            );
          },
        },
      },
    ];
    const options = {
      filterType: 'dropdown',
      responsive: 'scroll',
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20],
      selectableRows: 'none',
      textLabels: TEXT_LABELS,
      count: members.length,
      /* onRowClick: (rowData) => {
        console.log("RowClicked->", rowData);
      }, */
      /*  onRowsDelete: (rowsDeleted) => {
         const items = members; //lista de todos los proyectos
         const itemsToDelete = rowsDeleted.data.map((item) => items[item.dataIndex]); //Array de todos los proyectos a borrar.
         this.props.onDelete(itemsToDelete);
       }, */
    };

    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant='h6'>
              Miembros del Proyecto
              {onLoading && <LinearProgress color='secondary' />}
            </Typography>
          }
          data={members}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default MembersTable;
