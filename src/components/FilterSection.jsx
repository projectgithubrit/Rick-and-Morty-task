import React from 'react';
import { Grid,Card, Typography, FormGroup, FormControlLabel, Checkbox, FormLabel } from '@mui/material';

const speciesOptions = ['human', 'mythong', 'other'];
const genderOptions = ['male', 'female'];
const originOptions = ['earth (c-137)', 'unknown', 'abadango', 'other origin'];

function FilterSection({ filters, onFilterChange }) {
  const handleCheckboxChange = (event, filterType) => {
    const { name } = event.target;
    onFilterChange(filterType, name);

  };

  return (
    <Grid container direction="column" spacing={2} >
      <Grid item>
        <Typography variant="h6">Filters</Typography>
      </Grid>
      <Grid item>
      <Card sx={{
          padding:2
        }}>
        <FormGroup>
          <FormLabel component="legend">Species</FormLabel>
          {speciesOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={filters.species.includes(option)} onChange={(e)=>handleCheckboxChange(e,'species')} name={option} />}
              label={option.charAt(0).toUpperCase() + option.slice(1)} // Capitalize first letter
            />
          ))}
        </FormGroup>
        </Card>
      </Grid>
      <Grid item>
      <Card sx={{
          padding:2
        }}>
        <FormGroup>
          <FormLabel component="legend">Gender</FormLabel>
          {genderOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={filters.gender.includes(option)} onChange={(e)=>handleCheckboxChange(e,'gender')} name={option} />}
              label={option.charAt(0).toUpperCase() + option.slice(1)} // Capitalize first letter
            />
          ))}
        </FormGroup>
        </Card>
      </Grid>
      <Grid item>
      <Card sx={{
          padding:2
        }}>
        <FormGroup>
          <FormLabel component="legend">Origin</FormLabel>
          {originOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={filters.origin.includes(option)} onChange={(e)=>handleCheckboxChange(e,'origin')} name={option} />}
              label={option.charAt(0).toUpperCase() + option.slice(1)} // Capitalize first letter
            />
          ))}
        </FormGroup>
        </Card>
      </Grid>
    </Grid>
  );
}

export default FilterSection;
