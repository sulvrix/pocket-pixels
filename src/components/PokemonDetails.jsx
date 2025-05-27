import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pokemonData from '../data/pokemon-data.json';

const PokemonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const foundPokemon = pokemonData.find(p => p.id.toString() === id);
        if (!foundPokemon) {
            navigate('/');
            return;
        }
        setPokemon(foundPokemon);
    }, [id, navigate]);

    if (!pokemon) return <div className="text-center py-8">Loading...</div>;

    const [
        name,          // 0
        type1,         // 1
        type2,         // 2
        form,          // 3
        ability1,      // 4
        ability2,      // 5
        hiddenAbility, // 6
        total,         // 7
        hp,            // 8
        attack,        // 9
        defense,       // 10
        spAtk,         // 11
        spDef,         // 12
        speed,          // 13
        location,          // 13
        time          // 13
    ] = pokemon.data;

    const cleanStat = (stat) => {
        if (typeof stat !== 'string') return stat;
        return stat.replace(/\([^)]*\)/g, '').trim();
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <p className="text-gray-600">#{pokemon.id}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full ${getFormColorClass(form)}`}>
                            {form}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Basic Information</h2>
                        <div className="space-y-3">
                            <div>
                                <span className="font-medium block text-gray-700">Types:</span>
                                <div className="flex gap-2 mt-1">
                                    {type1 && type1 !== "-----" && type1 !== "null" && (
                                        <span className={`px-2 py-1 rounded text-white w-20 text-center ${getTypeColorClass(type1)}`}>
                                            {type1}
                                        </span>
                                    )}
                                    {type2 && type2 !== "-----" && type2 !== "null" && (
                                        <span className={`px-2 py-1 rounded text-white w-20 text-center ${getTypeColorClass(type2)}`}>
                                            {type2}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className="font-medium block text-gray-700">Abilities:</span>
                                <div className="mt-1 space-y-1">
                                    <div>{ability1}</div>
                                    {ability2 && ability2 !== "null" && <div>{ability2}</div>}
                                    {hiddenAbility && hiddenAbility !== "null" && (
                                        <div>
                                            <span className="text-gray-600">Hidden: </span>
                                            {hiddenAbility}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <span className="font-medium block text-gray-700">Spawning:</span>
                                <div className="mt-1 space-y-1">
                                    <div>
                                        <span className="text-gray-600">Biome: </span>
                                        {location}
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Time: </span>
                                        {time}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <StatBox label="Total" value={cleanStat(total)} />
                            <StatBox label="HP" value={cleanStat(hp)} />
                            <StatBox label="Attack" value={cleanStat(attack)} />
                            <StatBox label="Defense" value={cleanStat(defense)} />
                            <StatBox label="Sp. Atk" value={cleanStat(spAtk)} />
                            <StatBox label="Sp. Def" value={cleanStat(spDef)} />
                            <StatBox label="Speed" value={cleanStat(speed)} />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
                >
                    ← Back to Pokedex
                </button>
            </div>
        </div>
    );
};

const StatBox = ({ label, value }) => (
    <div className="border rounded p-2 text-center">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-lg font-bold">{value}</div>
    </div>
);

const getTypeColorClass = (type) => {
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
    return typeColors[type] || 'bg-gray-400';
};

const getFormColorClass = (form) => {
    const formColors = {
        PocketPixels: 'bg-blue-100 text-blue-800',
        Magma: 'bg-red-100 text-red-800',
        Slime: 'bg-green-100 text-green-800'
    };
    return formColors[form] || 'bg-gray-100 text-gray-800';
};

export default PokemonDetails;