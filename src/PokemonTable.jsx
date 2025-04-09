import React from 'react';

const PokemonTable = ({ pokemonData }) => {
    // Define column headers
    const headers = [
        "ID", "Name", "Type 1", "Type 2",
        "Ability 1", "Ability 2", "Hidden Ability",
        "HP", "Attack", "Defense",
        "Sp. Atk", "Sp. Def", "Speed",
        "Total", "Moves"
    ];

    return (
        <div className="pokemon-table-container">
            <h2>Pokemon Stats</h2>
            <table className="pokemon-table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(pokemonData).map(([id, pokemon]) => (
                        <tr key={id}>
                            <td>{id}</td>
                            {pokemon.map((stat, index) => (
                                <td key={index}>{stat}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PokemonTable;