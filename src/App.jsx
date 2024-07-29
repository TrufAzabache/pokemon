//Componentes:
import { Button } from "./Componentes/Button";
import { Card } from "./Componentes/Card";
//Estilos:
import './sass/App.scss'
//Iconos:
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
//Hooks:
import { useState, useEffect } from "react";



const App = () => {

    const [pokemonId, setPokemonId] = useState(60)
    const [pokemonEvolutions, setPokemonEvolutions] = useState([])

    function prevClick(){
        (pokemonId === 1)?
            setPokemonId(1):
            setPokemonId(pokemonId -1)
    }
    function nextClick(){
        setPokemonId(pokemonId +1)
    }

    useEffect(()=>{
        getEvolutions(pokemonId);
    }, [pokemonId])

    async function getEvolutions (id) {
        const response = await fetch (`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokemonEvoArray = []

        let pokemonLv1 = data.chain.species.name
        let pokemonLv1Img = await getPokemonImgs(pokemonLv1)
        pokemonEvoArray.push([pokemonLv1, pokemonLv1Img])

        if(data.chain.evolves_to.length !== 0){
            let pokemonLv2 = data.chain.evolves_to[0].species.name;
            let pokemonLv2Img = await getPokemonImgs(pokemonLv2)
            pokemonEvoArray.push([pokemonLv2, pokemonLv2Img])
        }
        if(data.chain.evolves_to[0].evolves_to.length !== 0){
            let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
            let pokemonLv3Img = await getPokemonImgs(pokemonLv3)
            pokemonEvoArray.push([pokemonLv3, pokemonLv3Img])
            setPokemonEvolutions(pokemonEvoArray)
        }
    }
    //setPokemonEvolutions(pokemonEvoArray)

    async function getPokemonImgs (name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other['official-artwork'].front_default;
    }
    
    return(
        <div className="app">
            <div className="card-container">
                {pokemonEvolutions.map(pokemon =>
                <Card
                    key={pokemon[0]}
                    name={pokemon[0]}
                    img={pokemon[1]}
                />
                )}
            </div>
            
            <div className="buttons-container">
                <Button 
                icon={<TiArrowLeftOutline />} 
                handleClick={prevClick}/> 

                <Button 
                icon={<TiArrowRightOutline />} 
                handleClick={nextClick}/>
            </div>
        </div>
    )
};
export {App}