import {useEffect, useState} from "react";
import axios from "axios";


function Home({endpoint}) {

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(endpoint);
                setPokemon(data);
            } catch(e) {
                console.error(e);
            }
        }

        fetchData();
    }, [])

    return <div className="page">
        <div className="card">
            {Object.keys(pokemon).length && <>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                <p><b>Moves:</b> {pokemon.moves.length}</p>
                <p><b>Weight:</b> {pokemon.weight}</p>
                <p><b>Abilities:</b></p>
                <ul className="abilities">
                    {pokemon.abilities.map((ability) => {
                            return <li key={ability.ability.name}>{ability.ability.name}</li>
                        }
                    )}
                </ul>
            </>}
        </div>
    </div>
}

export default Home;