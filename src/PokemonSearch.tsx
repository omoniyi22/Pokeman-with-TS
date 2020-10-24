import React, { Component } from 'react'
import { User } from './PokemonInterface'
import { Search } from './PokemonInterface'
import { Pokemon } from './PokemonInterface'



class PokemonSearch extends Component<User, Search>  {
  pokemonRef: React.RefObject<HTMLInputElement>
  constructor(props: User) {
    super(props)
    this.state = {
      error: false,
      pokemon: null
    }
    this.pokemonRef = React.createRef()
  }
  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            error: true,
            pokemon: null
          })
        }
        res.json().then(data => {
          this.setState({
            error: false,
            pokemon: {
              name: data.name,
              numberOfAbilities: data.abilities.length,
              baseExperience: data.base_experience,
              ImageUrl: data.sprites.front_default
            }
          })
        })
      }).catch(err => {
        this.setState({
          error: true,
          pokemon: null
        })
      })
  }
  render() {
    const { name: userName, numberOfPokemon } = this.props
    const { error, pokemon } = this.state

    let resultMarkup

    if (error) {
      resultMarkup = <p>Pokemon not found, please try again</p>
    } else if (this.state.pokemon) {
      resultMarkup = (
        <div>
          <img src={pokemon.ImageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} have {pokemon.numberOfAbilities} abilities and {pokemon.baseExperience} base experience points
          </p>
        </div>
      )
    }

    return (
      <div>
        <p>User {userName}  {numberOfPokemon && <span>{numberOfPokemon} has pokemon</span>}</p>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSearchClick} className="my-button">
          Search
        </button>
        {resultMarkup}
      </div>
    )
  }
}
export default PokemonSearch