import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonTable = ({ pokemonData = [] }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Generate suggestions based on search query
    useEffect(() => {
        if (searchQuery.length > 0) {
            const query = searchQuery.toLowerCase();

            // Find matching Pokemon names
            const nameMatches = pokemonData
                .filter(pokemon => pokemon.data[0].toLowerCase().includes(query))
                .map(pokemon => ({
                    text: pokemon.data[0],
                    type: 'Pokemon',
                    value: pokemon.data[0]
                }));

            // Find matching types (from all unique types in the data)
            const allTypes = new Set();
            pokemonData.forEach(pokemon => {
                if (pokemon.data[1] && pokemon.data[1] !== "-----" && pokemon.data[1] !== "null") {
                    allTypes.add(pokemon.data[1]);
                }
                if (pokemon.data[2] && pokemon.data[2] !== "-----" && pokemon.data[2] !== "null") {
                    allTypes.add(pokemon.data[2]);
                }
            });

            const typeMatches = Array.from(allTypes)
                .filter(type => type.toLowerCase().includes(query))
                .map(type => ({
                    text: type,
                    type: 'Type',
                    value: type // For autocomplete
                }));

            const allForms = new Set();
            pokemonData.forEach(pokemon => {
                allForms.add(pokemon.data[3]);
            });

            const formMatches = Array.from(allForms)
                .filter(form => form.toLowerCase().includes(query))
                .map(form => ({
                    text: form,
                    type: 'Form',
                    value: form // For autocomplete
                }));

            // Combine and limit suggestions
            const allMatches = [...nameMatches, ...typeMatches, ...formMatches]
                .sort((a, b) => a.text.localeCompare(b.text))
                .slice(0, 10); // Limit to 10 suggestions

            setSuggestions(allMatches);
            setShowSuggestions(allMatches.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery, pokemonData]);

    const cleanStat = (stat) => {
        if (typeof stat !== 'string') return stat;
        return stat.replace(/\([^)]*\)/g, '').trim();
    };

    const headers = [
        { key: 'id', label: "#" },
        { key: 'name', label: "Name" },
        { key: 'types', label: "Types" },
        { key: 'form', label: "Form" },
        { key: 'total', label: "Total" },
        { key: 'hp', label: "HP" },
        { key: 'attack', label: "Attack" },
        { key: 'defense', label: "Defense" },
        { key: 'spAtk', label: "Sp. Atk" },
        { key: 'spDef', label: "Sp. Def" },
        { key: 'speed', label: "Speed" }
    ];

    const headerToDataIndex = {
        'id': null,
        'name': 0,
        'types': [1, 2],
        'form': 3,
        'total': 7,
        'hp': 8,
        'attack': 9,
        'defense': 10,
        'spAtk': 11,
        'spDef': 12,
        'speed': 13
    };

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

    const handleRowClick = (pokemonId) => {
        navigate(`/pokemon/${pokemonId}`);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                if (prev.direction === 'asc') return { key, direction: 'desc' };
                if (prev.direction === 'desc') return { key: null, direction: null };
            }
            return { key, direction: 'asc' };
        });
    };

    const filteredData = pokemonData.filter((pokemon) => {
        const [name, type1, type2, form, , , , total, hp, attack, defense, spAtk, spDef, speed] = pokemon.data;
        const id = pokemon.id;
        const searchTarget = `${id} ${name} ${type1} ${type2} ${form} ${total} ${hp} ${attack} ${defense} ${spAtk} ${spDef} ${speed}`;
        return searchTarget.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key || !sortConfig.direction) return 0;

        if (sortConfig.key === 'id') {
            const aValue = parseInt(a.id.split('-')[0]);
            const bValue = parseInt(b.id.split('-')[0]);
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const dataIndex = headerToDataIndex[sortConfig.key];

        if (sortConfig.key === 'types') {
            const aTypes = [a.data[1], a.data[2]].filter(t => t && t !== "null").join(', ');
            const bTypes = [b.data[1], b.data[2]].filter(t => t && t !== "null").join(', ');
            return sortConfig.direction === 'asc'
                ? aTypes.localeCompare(bTypes)
                : bTypes.localeCompare(aTypes);
        }

        const aValue = a.data[dataIndex];
        const bValue = b.data[dataIndex];

        const cleanValue = (value) => {
            if (typeof value === 'string') {
                const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? value : num;
            }
            return value;
        };

        const cleanA = cleanValue(aValue);
        const cleanB = cleanValue(bValue);

        if (typeof cleanA === 'number' && typeof cleanB === 'number') {
            return sortConfig.direction === 'asc' ? cleanA - cleanB : cleanB - cleanA;
        }

        if (typeof cleanA === 'string' && typeof cleanB === 'string') {
            return sortConfig.direction === 'asc'
                ? cleanA.localeCompare(cleanB)
                : cleanB.localeCompare(cleanA);
        }

        return 0;
    });


    return (
        <div className="mx-5 overflow-x-auto">
            <div className="relative mb-3">
                <input
                    type="text"
                    placeholder="Search Pokemon or types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="p-2 border border-gray-300 rounded w-full"
                />
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                onClick={() => {
                                    setSearchQuery(suggestion.value);
                                    setShowSuggestions(false);
                                }}
                            >
                                <span>{suggestion.text}</span>
                                <span className="text-gray-500 text-sm">{suggestion.type}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {sortedData.length === 0 ? (
                <div className="text-gray-500">No Pokemon data available</div>
            ) : (
                <table className="w-full border-collapse mt-3">
                    <thead>
                        <tr className="bg-gray-100">
                            {headers.map(({ key, label }) => (
                                <th
                                    key={key}
                                    className="p-2 text-center border border-gray-300 cursor-pointer"
                                    onClick={() => handleSort(key)}
                                >
                                    {label}
                                    {sortConfig.key === key && (
                                        <span>
                                            {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((pokemon) => {
                            if (!pokemon?.id || !Array.isArray(pokemon?.data)) {
                                return null;
                            }

                            const [
                                name,
                                type1,
                                type2,
                                form,
                                ability1,
                                ability2,
                                hiddenAbility,
                                total,
                                hp,
                                attack,
                                defense,
                                spAtk,
                                spDef,
                                speed
                            ] = pokemon.data;
                            const formColors = {
                                PocketPixels: (
                                    <span>
                                        <span className="text-blue-500">Pocket</span>
                                        <span className="text-yellow-500">Pixels</span>
                                    </span>
                                ),
                                Magma: 'text-red-600',
                                Slime: 'text-green-500'
                            };

                            const formDisplay = form && formColors[form] ? (
                                form === "PocketPixels" ? (
                                    <span>
                                        <span className="text-blue-500">Pocket</span>
                                        <span className="text-yellow-500">Pixels</span>
                                    </span>
                                ) : (
                                    <span className={`px-2 py-1 rounded ${formColors[form]}`}>
                                        {form}
                                    </span>
                                )
                            ) : (
                                form
                            );

                            const typesDisplay = (
                                <div className="flex gap-2 justify-center flex-wrap">
                                    {type1 && type1 !== "-----" && type1 !== "null" && (
                                        <span className={`px-2 py-1 rounded text-white w-20 ${typeColors[type1]}`}>
                                            {type1}
                                        </span>
                                    )}
                                    {type2 && type2 !== "-----" && type2 !== "null" && (
                                        <span className={`px-2 py-1 rounded text-white w-20 ${typeColors[type2]}`}>
                                            {type2}
                                        </span>
                                    )}
                                </div>
                            );

                            const displayData = [
                                pokemon.id.includes('-') ? pokemon.id.split('-')[0] : pokemon.id,
                                name,
                                typesDisplay,
                                formDisplay,
                                cleanStat(total),
                                cleanStat(hp),
                                cleanStat(attack),
                                cleanStat(defense),
                                cleanStat(spAtk),
                                cleanStat(spDef),
                                cleanStat(speed)
                            ];

                            return (
                                <tr
                                    key={pokemon.id}
                                    className="hover:bg-gray-300 cursor-pointer"
                                    onClick={() => handleRowClick(pokemon.id)}
                                >
                                    {displayData.map((data, index) => (
                                        <td
                                            key={`${pokemon.id}-${index}`}
                                            className="p-2 border border-gray-300 text-center"
                                        >
                                            {data}
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