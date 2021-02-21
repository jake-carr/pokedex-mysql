import React from 'react';
import Pokemon from './Pokemon.jsx'

function List(props) {
  const { pokemons, fetch } = props;

  const renderList = () => {
    return pokemons.map((pokemon, i) => {
      return <Pokemon key={i} name={pokemon.name}  type={pokemon.type} img={pokemon.img} id={pokemon.id} fetch={fetch} />
    })
  }

  return(
    <div className='pokedex'>
      {renderList()}
    </div>
  )

}

export default List