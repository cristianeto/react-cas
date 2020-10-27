import React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

function SearchButton({ onSearch }) {
  return (
    <Button
      disabled={false}
      size="medium"
      variant="contained"
      color="primary"
      margin="normal"
      startIcon={<SearchIcon />}
      className="btn btn-guardar"
      onClick={onSearch}>
      Buscar
    </Button>
  );
}

export default SearchButton;