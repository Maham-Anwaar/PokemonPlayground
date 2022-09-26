import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from "axios";

import {ThemeProvider} from '@mui/material/styles';

import theme from '../constants/mui-theme/index';

import {URLS} from './constants';

import {FancyDiv} from './style';

function App() {

  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState(null);
  const [color, setColor] = useState(null);
  const [id, setId] = useState(null);

  useEffect(()=>{
    getPokemon("pikachu/");
  }, []);

  useEffect(()=>{
    if(id)
    {
      getPokemon(`${id}/`);
    }
  }, [id]);

  useEffect(()=>{
    if(pokemon)
    {
      getDescription(pokemon.id+'/');
      getColor(pokemon.id+'/');
      console.log('> ', color);
    }
  }, [pokemon]);

  const getPokemon = (name) => {
    axios.get(URLS.GET_POKEMON + name).then((res) => {
      setPokemon(res.data);

    });
  };

  const getDescription = (id) => {
    axios.get(URLS.GET_DESCRIPTION + id).then((res) => {
      const paragraph = res.data.effect_entries.filter(item => item.language.name==='en');
      console.log(paragraph[0]);
      setDescription(paragraph[0].short_effect);
    });
  };

  const getColor = (id) => {
    axios.get(URLS.GET_COLOR + id).then((res) => {
      setColor(res.data.color.name);
    });
  };

  return (
    <ThemeProvider theme={theme}>      
    <div style={{ display:'flex', justifyContent:'center' }}>
    <Button size="small"
    onClick={()=>{
      setId(pokemon.id-1);
    }}
    >
      {"<"}
    </Button>
    { pokemon &&
      <Card sx={{ maxWidth: 300, minWidth: 300}}>
      <CardMedia
        component="img"
        height="200"
        image={pokemon.sprites.front_default}
        alt='pokemon'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align='center'>
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <FancyDiv color={color}>
          <Typography variant="body2">
            {pokemon.types[0].type.name}
          </Typography>
        </FancyDiv>

      </CardContent>
    </Card>
    }
    <Button size="small"
    onClick={()=>{
      setId(pokemon.id+1);
    }}
    >
      {">"}
    </Button>
    </div>
    </ThemeProvider>
  );
}

export default App;
