import {Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonFilteredByName, setTextSearch } from '../slices/dataSlice';

const Searcher = ()=>{
    const textSearch = useSelector(state=>state.data.textSearch);
    const dispatch = useDispatch();

    return  (<Input.Search 
        placeholder='Buscar...' 
        value={textSearch}
        onChange={(event)=>{
                event.preventDefault();
                dispatch(setTextSearch(event.target.value))
            }
        }
        onSearch={()=>{
            dispatch(setPokemonFilteredByName(textSearch))
        }}
        style={{marginBottom: 10}}/>)
}

export default Searcher;