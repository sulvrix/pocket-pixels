import React from 'react';
import PokemonTable from './PokemonTable';
import pokemonData from '.assets/pokemon-data.json';

function App() {

  return (
    <div className="App">
      <PokemonTable pokemonData={pokemonData} />
    </div>
  )
}

export default App
