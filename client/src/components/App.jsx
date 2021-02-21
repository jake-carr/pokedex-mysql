import React from 'react';
import axios from 'axios';
import List from './List.jsx';
import Insert from './Insert.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: '',
      pokemon: [],
      types: []
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  showAll() {
    this.setState({sort: ''}, () => {
      this.getPokemon()
    })
  }

  handleSelect(e) {
    this.setState({sort: e.target.value}, () => {
      this.getPokemon()
    })
  }

  sortBy(arr, type) {
    return arr.filter(item => item.type === type)
  }

  getPokemon() {
    axios.get('/api')
      .then((result) => {
        let array = result.data;
        if (this.state.sort.length) {
          let sortedArray = this.sortBy(array, this.state.sort);
          this.setState({pokemon: sortedArray});
        } else {
          this.setState({pokemon: array})
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  getTypes() {
    axios.get('/api/t')
      .then((result) => {
        let options = [];
        for (let item of result.data) {
          if (!options.includes(item.type)) {
            options.push(item.type);
          }
        }
        this.setState({types: options})
      })
  }

  fetch() {
    this.getPokemon();
    this.getTypes();
  }

  componentDidMount() {
    this.fetch()
  }

  renderTypeOptions() {
    return this.state.types.map((type, i) => {
      return <option key={i} value={type}>{type}</option>
    })

  }

  render() {
    return (
      <div>
        <h1>Fullstack Pokedex!</h1>
        <Insert fetch={this.fetch} />
        <button onClick={() => this.showAll()}>Show All</button>
        <select id="types" onChange={this.handleSelect}>
          <option>Sort by Type</option>
          {this.renderTypeOptions()}
        </select>
        <List pokemons={this.state.pokemon} fetch={this.fetch} />
      </div>
    )
  }
}