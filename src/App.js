import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Spin } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import logo from './statics/logo.svg';
import 'antd/dist/reset.css';
import './App.css';
import { fetchPokemonsWithDetails } from './slices/dataSlice';

function App() {
  const pokemons = useSelector(state => state.data.pokemons, shallowEqual);
  const loading = useSelector(state => state.ui.loading);

  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(fetchPokemonsWithDetails());
  },[dispatch])

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
