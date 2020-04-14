export let OPTIONS = {
  filterType: "dropdown",
  responsive: "scroll",
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 20],
  textLabels: {
    body: {
      noMatch: "Lo sentimos, no se han encontrado registros",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Página siguiente",
      previous: "Página anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Filtrar Tabla",
    },
    filter: {
      all: "Todo",
      title: "FILTRADO",
      reset: "RESETEAR",
    },
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar Table Columns",
    },
    selectedRows: {
      text: "fila(s) seleccionada(s)",
      delete: "Borrar",
      deleteAria: "Delete Selected Rows",
    },
  },
};
