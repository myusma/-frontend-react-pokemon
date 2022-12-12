import {useEffect, useState} from 'react';
import React from 'react';
import './App.css';
import axios from "axios";
import Home from "./Component/Home/Home";
import Button from "./Component/Button/Button";
import logo from "./assets/Pokemon.png"

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [endpoint, setEndPoint] = useState('https://pokeapi.co/api/v2/pokemon');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                setError( false );
                const {data} = await axios.get(endpoint);
                console.log(data)
                setPokemons(data);
            } catch (e) {
                console.error(e);
                setError(true);

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading(false);
        }

        fetchData();

    }, [endpoint]);

    return (
        <>
            { loading && <p className='loading'>Loading...</p> }
            { error && <p>Error: Er is iets mis gegaan!</p> }

        <div className="container">

            <img className="logo" src={logo}  alt="Pokemon logo"/>

            <div className="button">

                <Button
                    disabled={!pokemons.previous}
                    handleClick={() => {setEndPoint(pokemons.previous)}}
                >
                    Vorige
                </Button>

                <Button
                    disabled={!pokemons.next}
                    handleClick={() => {setEndPoint(pokemons.next)}}
                >
                    Volgende
                </Button>

            </div>


            <div className="map">
                {Object.keys(pokemons).length && pokemons.results.map((pokemon) => {
                    return <Home key={pokemon.name} endpoint={pokemon.url}/>
                })}
            </div>

        </div>
        </>
    )
}

export default App;

