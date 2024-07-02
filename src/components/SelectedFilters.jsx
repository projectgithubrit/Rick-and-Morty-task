import React from 'react';
import { Chip, Grid, Typography } from '@mui/material';

function SelectedFilters({ filters, onRemoveFilter }) {
  const filterLabels = {
    species: 'Species',
    gender: 'Gender',
    origin: 'Origin'
  };

  const handleRemove = (filterType, value) => {
    onRemoveFilter(filterType, value);
  };

  const renderSelectedFilters = () => {
    let selectedFilters = [];

    for (const [filterType, values] of Object.entries(filters)) {
      values.forEach((value) => {
        selectedFilters.push(
          <Grid item key={`${filterType}-${value}`} >
            <Chip
              style={{backgroundColor:'rgb(113 109 109)', color: 'white'}}
              label={`${filterLabels[filterType]}: ${value}`}
              onDelete={() => handleRemove(filterType, value)}
              // color="primary"
              variant="outlined"
            />
          </Grid>
        );
      });
    }

    return selectedFilters;
  };

  return (
    <Grid container spacing={1} alignItems="center" marginBottom={2}>
      {!!renderSelectedFilters().length && <Grid item>
        <Typography variant="h6">Selected Filters</Typography>
      </Grid>}
      {renderSelectedFilters()}
    </Grid>
  );
}

export default SelectedFilters;
