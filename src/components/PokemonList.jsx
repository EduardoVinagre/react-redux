import PokemonCard from "./PokemonCard";
import './PokemonList.css'

const PokemonList = ({ pokemons=Array(10).fill('') }) => {
    return (
        <div className="PokemonList"> 
            {pokemons.map(() => {
                return <PokemonCard />;
            })}
        </div>
    );
};

PokemonList.defaultProps = {
    pokemons: Array(10).fill(''),
}

export default PokemonList;