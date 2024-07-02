import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

function CharacterList({ filters, searchTerm, sortBy, sortOrder }) {
  const [characters, setCharacters] = useState([]);
  const [otherOption, setOtherOption] = useState([]);
  let other={species: [], origin:[]};
  let selected={species:[],origin:[]};

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character/');
      const data = await response.json();
      setCharacters(data.results);

      //extracting other species and other origin option
      data.results.forEach(character => {
        //other species
        if (!['mythong', 'human'].includes(character.species.toLowerCase())) {
          !other.species.includes(character.species.toLowerCase()) && other.species.push(character.species.toLowerCase());
        }
        //other origin
        if (!['unknown', 'abadango', 'earth (c-137)'].includes(character.origin.name.toLowerCase())) {
          !other.origin.includes(character.origin.name.toLowerCase()) && other.origin.push(character.origin.name.toLowerCase());
        }
      })
      setOtherOption(other);

    };

    fetchData();
  }, [filters, searchTerm, sortBy, sortOrder]);

  // Apply filters, and search to characters
  let filteredCharacters = characters.filter(character => {
    // merging other option into selected option
    selected['species'] = filters.species.includes('other') ? [...filters.species, ...otherOption.species] : [...filters.species];
    selected['origin'] = filters.origin.includes('other origin') ? [...filters.origin, ...otherOption.origin] : [...filters.origin];

    // applying respective filter and search
    if (filters.species.length > 0 && !selected.species.includes(character.species.toLowerCase())) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(character.gender.toLowerCase())) return false;
    if (filters.origin.length > 0 && !selected.origin.includes(character.origin.name.toLowerCase())) return false;
    if (searchTerm && !character.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Sorting
  filteredCharacters.sort((a, b) => {
    if (sortBy === 'id') {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    }
    return 0;
  });
  return (
    <Grid container spacing={2} style={{backgroundColor:'rgb(29 26 26)'}}>
      {filteredCharacters.map((character) => (
        <Grid item key={character.id} xs={12} sm={6} md={3}>
          <Card>  
            <CardMedia
              component="img"
              height="280"
              image={character.image}
              alt={character.name}
            />
           < CardContent style={{backgroundColor:'black', opacity:"0.5", marginTop:"-86px", color:'#FFF'}}>
              <Typography  variant="h6" component="div">
                {character.name}
            
              </Typography>
              <Typography  component="div" style={{fontSize:"15px"}}  >
                id-{character.id}-created {moment(new Date().toDateString()).diff(character.created, 'years')} years ago
              </Typography></CardContent>
              < CardContent style={{backgroundColor:'#3a3838', color:'#FFF',minHeight:'350px'}}>
              <Typography className='card' sx={{padding:"10px 0",  borderBottom:"1px solid #979090",display:"flex", justifyContent:"space-between" }} component="div" >
                Status
                <Typography sx={{color:"orange"}} > {character.status} </Typography> 
              </Typography>
              <Typography className="card" sx={{padding:"10px 0", borderBottom:"1px solid #979090",display:"flex", justifyContent:"space-between"   }}  component="div">
                Species:
                <Typography  sx={{color:"orange"}} > {character.species}</Typography> 
              </Typography>
              <Typography className="card" sx={{padding:"10px 0",  borderBottom:"1px solid #979090", display:"flex", justifyContent:"space-between" }}  component="div">
                Gender:
                <Typography sx={{color:"orange"}}> {character.gender}</Typography>
              </Typography>
              <Typography className="card" sx={{padding:"10px 0", borderBottom:"1px solid #979090", display:"flex", justifyContent:"space-between"  }}  component="div">
                Origin:
                <Typography sx={{color:"orange"}}>{character.origin.name}</Typography>
              </Typography>
              <Typography className="card" sx={{padding:"10px 0", display:"flex", justifyContent:"space-between"  }}variant="body2" component="div">
                Last Location:
                <Typography sx={{color:"orange"}}> {character.location.name} </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CharacterList;
