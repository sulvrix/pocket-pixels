import React from 'react';

const PokemonTable = ({ pokemonData = [] }) => {  // Default to empty array
    // Function to remove parentheses and their content
    const cleanStat = (stat) => {
        if (typeof stat !== 'string') return stat;
        return stat.replace(/\([^)]*\)/g, '').trim();
    };

    const headers = [
        "ID", "Name", "Type 1", "Type 2",
        "Ability 1", "Ability 2", "Hidden Ability",
        "HP", "Attack", "Defense",
        "Sp. Atk", "Sp. Def", "Speed",
        "Total", "Moves"
    ];

    const typeColors = {
        Normal: '#A8A878',
        Fire: '#F08030',
        Water: '#6890F0',
        Electric: '#F8D030',
        Grass: '#78C850',
        Ice: '#98D8D8',
        Fighting: '#C03028',
        Poison: '#A040A0',
        Ground: '#E0C068',
        Flying: '#A890F0',
        Psychic: '#F85888',
        Bug: '#A8B820',
        Rock: '#B8A038',
        Ghost: '#705898',
        Dragon: '#7038F8',
        Dark: '#705848',
        Steel: '#B8B8D0',
        Fairy: '#EE99AC'
    };

    // Validate pokemonData structure
    if (!Array.isArray(pokemonData)) {
        return <div>Error: Invalid Pokemon data format</div>;
    }

    return (
        <div style={{ margin: '20px', overflowX: 'auto' }}>
            <h2>Pokemon Stats</h2>
            {pokemonData.length === 0 ? (
                <div>No Pokemon data available</div>
            ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '10px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            {headers.map((header) => (
                                <th key={header} style={{
                                    padding: '8px',
                                    textAlign: 'left',
                                    border: '1px solid #ddd'
                                }}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonData.map((pokemon) => {
                            if (!pokemon?.id || !Array.isArray(pokemon?.data)) {
                                return null; // Skip invalid entries
                            }

                            return (
                                <tr key={pokemon.id}>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                        {String(pokemon.id).includes('-')
                                            ? String(pokemon.id).split('-')[0]
                                            : pokemon.id}
                                    </td>
                                    {pokemon.data.map((stat, index) => (
                                        <td
                                            key={`${pokemon.id}-${index}`}
                                            style={{ backgroundColor: index === 1 || 2 ? typeColors[stat] || '#fff' : 'inherit', padding: '8px', border: '1px solid #ddd' }}
                                        >
                                            {index >= 6 && index <= 12 ? cleanStat(stat) : stat}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PokemonTable;