import React from 'react';
import { Grid, TextField, MenuItem, InputAdornment, FormControl, InputLabel, Select } from '@mui/material';
import SearchIcon from "@material-ui/icons/Search";

function SearchBar({ searchTerm, onSearchTermChange, sortBy, sortOrder, onSortChange, onSortOrderChange }) {

  const handleSortOrderChange = (event) => {
    onSortOrderChange(event.target.value);
  };

  return (
    <Grid container spacing={2} marginBottom={4} alignItems="center">
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </Grid>
      <Grid sx={{}} item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By id</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={sortOrder}
            label="Sort By id"
            onChange={handleSortOrderChange}
            variant="outlined"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
