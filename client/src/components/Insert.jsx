import React from 'react';
import axios from 'axios';

function Insert(props) {

  const { fetch } = props;

  const [name, changeName] = React.useState('');
  const [type, changeType] = React.useState('');
  const [img, changeImg] = React.useState('');

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      changeName(e.target.value)
    }
    if (e.target.name === 'type') {
      changeType(e.target.value)
    }
    if (e.target.name === 'img') {
      changeImg(e.target.value)
    }
  }

  const add = () => {
    if (name.length && type.length && img.length) {
      axios.post('/api', {
        name: name,
        type: type,
        img: img
      })
        .then(() => {
          fetch();
          changeName('');
          changeType('');
          changeImg('');
        })
    }

  }


  return (
    <div>
      <input onChange={handleChange} placeholder='name' name='name' />
      <input onChange={handleChange} placeholder='type' name='type' />
      <input onChange={handleChange} placeholder='img' name='img' />
      <button onClick={() => add()}>ADD POKEMON</button>

    </div>
  )
}

export default Insert