import React, { useState } from 'react';
import FilterSection from './components/FilterSection';
import SelectedFilters from './components/SelectedFilters';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import { Grid, Container, Typography, CssBaseline } from '@mui/material';

function App() {
  const [filters, setFilters] = useState({
    species: [],
    gender: [],
    origin: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (filterType, value) => {
    let updatedFilters = { ...filters };

    if (!updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = [...updatedFilters[filterType], value];
    } else {
      updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
    }

    setFilters(updatedFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: filters[filterType].filter((item) => item !== value) };
    setFilters(updatedFilters);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Rick and Morty character search
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={2}>
            <FilterSection
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <SelectedFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
            />
            <SearchBar
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSortBy}
              onSortOrderChange={setSortOrder}
            />
            <CharacterList
              filters={filters}
              searchTerm={searchTerm}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;


