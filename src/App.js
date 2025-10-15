import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Spin } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import { getPokemon } from './api';
import { getPokemonsWithDetails, setLoading } from './actions';
import logo from './statics/logo.svg';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const pokemons = useSelector(state => state.pokemons);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setLoading(true));
    const fetchPokemons = async ()=> {
      const pokemonsRes = await getPokemon();
      dispatch(getPokemonsWithDetails(pokemonsRes));
      dispatch(setLoading(false));
    }
    fetchPokemons();
  },[])

  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? <Col>
        <Spin spinning size="large" />
      </Col>
      : <PokemonList pokemons={pokemons}/>}
    </div>
  );
}

export default App;
