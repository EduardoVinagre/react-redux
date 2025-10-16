import { fromJS } from "immutable";
import { SET_FAVORITE, SET_LOADING, SET_POKEMONS } from "../actions/types"

const initialState = fromJS({
  pokemons: [],
  loading: false,
})

export const pokemonsReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_POKEMONS: 
      // return {
      //   ...state, pokemons: action.payload
      // };
      return state.setIn(['pokemons'], fromJS(action.payload));
    case SET_FAVORITE:
      // const newPokemonsList = [...state.pokemons];
      const currentPokemonIndex = state.get('pokemons').findIndex(pokemon=>pokemon.get('id') === action.payload.pokemonId)

      if(currentPokemonIndex < 0){
        return state;
      }

      //newPokemonsList[currentPokemonIndex].favorite = !newPokemonsList[currentPokemonIndex].favorite;
      const isFavorite = state.get('pokemons').get(currentPokemonIndex).get('favorite');
      // const isFavorite2 = state.getIn(['pokemons',currentPokemonIndex,'favorite']);



      // return {
      //   ...state, 
      //   pokemons:newPokemonsList
      // }
      return state.setIn(['pokemons', currentPokemonIndex,'favorite'],!isFavorite); 
    case SET_LOADING:
      // return {
      //   ...state, loading: action.payload
      // }
      return state.setIn(['loading'], action.payload);
    default:
      return state;
  }
}