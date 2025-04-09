import React from 'react';

const PokemonTable = ({ pokemonData = [] }) => {
    // Function to remove parentheses and their content
    const cleanStat = (stat) => {
        if (typeof stat !== 'string') return stat;
        return stat.replace(/\([^)]*\)/g, '').trim();
    };

    const headers = [
        "#", "Name", "Type 1", "Type 2", "Form",
        "Ability 1", "Ability 2", "Hidden Ability",
        "HP", "Attack", "Defense",
        "Sp. Atk", "Sp. Def", "Speed",
        "Total", "Moves"
    ];

    // Tailwind color classes for types
    const typeColors = {
        Normal: 'bg-stone-400',
        Fire: 'bg-orange-600',
        Water: 'bg-blue-500',
        Electric: 'bg-yellow-400',
        Grass: 'bg-green-500',
        Ice: 'bg-cyan-300',
        Fighting: 'bg-red-900/80',
        Poison: 'bg-purple-500',
        Ground: 'bg-yellow-600/70',
        Flying: 'bg-indigo-300',
        Psychic: 'bg-pink-500',
        Bug: 'bg-lime-500/60',
        Rock: 'bg-yellow-600/40',
        Ghost: 'bg-purple-700',
        Dragon: 'bg-indigo-700',
        Dark: 'bg-orange-950/80',
        Steel: 'bg-slate-400/70',
        Fairy: 'bg-fuchsia-300'
    };

    // Tailwind color classes for forms
    const formColors = {
        PocketPixels: 'text-blue-600',
        Magma: 'text-red-700',
        Slime: 'text-green-600'
    };

    // Validate pokemonData structure
    if (!Array.isArray(pokemonData)) {
        return <div className="text-red-500">Error: Invalid Pokemon data format</div>;
    }

    return (
        <div className="mx-5 overflow-x-auto">
            <h2 className="text-2xl font-bold my-4">Pokemon Stats</h2>
            {pokemonData.length === 0 ? (
                <div className="text-gray-500">No Pokemon data available</div>
            ) : (
                <table className="w-full border-collapse mt-3">
                    <thead>
                        <tr className="bg-gray-100">
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="p-2 text-center border border-gray-300"
                                >
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
                                <tr key={pokemon.id} className="hover:bg-gray-50">
                                    <td className="p-2 border border-gray-300">
                                        {String(pokemon.id).includes('-')
                                            ? String(pokemon.id).split('-')[0]
                                            : pokemon.id}
                                    </td>
                                    {pokemon.data.map((stat, index) => {
                                        // Determine background color for type cells
                                        const bgColor = (index === 1 || index === 2)
                                            ? typeColors[stat] || 'bg-white'
                                            : 'bg-inherit';

                                        // Determine text color for form cells
                                        const textColor = (index === 3)
                                            ? formColors[stat] || 'text-black'
                                            : (index === 1 || index === 2)
                                                ? 'text-white' // Example: Add a default text color for type cells
                                                : 'text-inherit';

                                        const textShadow = (index === 1 || index === 2) ? "text-shadow" : "text-shadow-inherit";

                                        return (
                                            <td
                                                key={`${pokemon.id}-${index}`}
                                                className={`
                                                    p-2 border border-gray-300
                                                    ${bgColor} ${textColor} ${textShadow} text-center
                                                `}
                                            >
                                                {index >= 7 && index <= 13 ? cleanStat(stat) : stat}
                                            </td>
                                        );
                                    })}
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