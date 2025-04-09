import React from 'react';
import PokemonTable from './components/PokemonTable';
import pokemonData from './data/pokemon-data.json';

function App() {


  console.log('Full pokemonData:', pokemonData);
  console.log('Venusaur data:', pokemonData["3"]);

  return (
    <div className="App">
      <PokemonTable pokemonData={pokemonData} />
    </div>
  )
}

export default App
