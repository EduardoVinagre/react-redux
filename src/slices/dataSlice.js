import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../api";
import { setLoading } from "../slices/uiSlice";

const initialState = {
    pokemons: [],
    pokemonsOriginals: [],
    textSearch: '',
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {
        dispatch(setLoading(true))

        const pokemonsRes = await getPokemon();
        const pokemonsDetailed = await Promise.all(
            pokemonsRes.map(pokemon => getPokemonDetails(pokemon))
        );
        dispatch(setPokemons(pokemonsDetailed));
        dispatch(setLoading(false));
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
            state.pokemonsOriginals = action.payload;
        },
        setTextSearch: (state, action) => {
            state.textSearch = action.payload;
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex(pokemon=>pokemon.id === action.payload.pokemonId)

            if(currentPokemonIndex < 0){
                return state;
            }

            const isFavorite = state.pokemons[currentPokemonIndex].favorite;  
            state.pokemons[currentPokemonIndex].favorite = !isFavorite;             
        },
        setPokemonFilteredByName: (state, action) => {
            if( action.payload === ''){
                state.pokemons = state.pokemonsOriginals;
            } else {
                const pokemonsFiltered = state.pokemons.filter(pokemon=>pokemon.name.includes(action.payload));
                state.pokemons = pokemonsFiltered;
            }
        },
    }
})

export const {
    setFavorite, setPokemons, setTextSearch, setPokemonFilteredByName
} = dataSlice.actions;

console.log(dataSlice);

export default dataSlice.reducer;