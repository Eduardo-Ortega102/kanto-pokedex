export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  small_image: string;
  large_image: string;
  evolutions?: Evolution[];
}

export interface PokemonType {
  name: string;
  url: string;
  double_damage_from?: string[];
  double_damage_to?: string[];
  half_damage_from?: string[];
  half_damage_to?: string[];
  no_damage_from?: string[];
  no_damage_to?: string[];
}

export interface Evolution {
  specie: string;
  min_level: number;
  trigger?: string;
  item: string;
}

export interface Region {
  name: string;
  types: PokemonType[];
  pokemon_list: Pokemon[];
}
