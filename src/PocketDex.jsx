import PokemonTable from './components/PokemonTable';
import pokemonData from './data/pokemon-data.json';

const PocketDex = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">PocketDex</h1>
            <PokemonTable pokemonData={pokemonData} />
        </div>
    );
}

export default PocketDex;