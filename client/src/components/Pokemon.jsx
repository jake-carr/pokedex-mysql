import React from 'react';
import axios from 'axios'

function Pokemon(props) {
  const {name, type, img, id, fetch} = props;

  const [editing, toggle] = React.useState(false);
  const [userInput, changeUserInput] = React.useState('');

  const handleChange = (e) => {
    changeUserInput(e.target.value)
  }

  const updateName = () => {
    if (userInput.length) {
      axios.patch(`api/${id}`, {
        name: userInput
      })
        .then(() => {
          changeUserInput('');
          toggle(!editing);
          fetch();
        })
    }

  }

  const goodbye = () => {
    axios.delete(`api/${id}`)
      .then(() => {
        fetch();
      })
  }

  return (
    <div>
        <h3 onClick={() => toggle(!editing)}>{name}</h3>
        <button onClick={() => goodbye()}>delete</button>
        {editing ?
          <div>
            <input onChange={handleChange} placeholder='EDIT NAME HERE' />
            <button onClick={() => updateName()}>rename pokemon</button>
          </div>
          : null}
        <div>Type {type}</div>
        <img src={img} />
    </div>
  )
}

export default Pokemon