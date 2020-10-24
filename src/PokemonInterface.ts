export interface User {
  name: string
  numberOfPokemon?: number
}
export interface Pokemon {
  name: string
  numberOfAbilities: number
  baseExperience: number
  ImageUrl: string
}
export interface Search {
  error: boolean,
  pokemon: Pokemon
}
