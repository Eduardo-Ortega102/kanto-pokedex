import { getLocaleExtraDayPeriods } from '@angular/common';
import { Injectable } from '@angular/core';
import axios from 'axios';
import {Region, Pokemon} from '../pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private region: Region;
  private BASE_URL : string = 'https://pokeapi.co/api/v2/';
  constructor() { }

  public getRegion(): Promise<Region> {
    return axios.get(this.BASE_URL + 'generation/1')
    .then(response => response.data)
    .then(data => {
      return this.getPokemonList(data.pokemon_species)
      .then(list => {
        this.region = {
          name: data.main_region.name,
          types: data.types,
          pokemon_list: list
        };
        this.fillTypeDetails();
        return this.region;
      });
    });
  }

  private getPokemonList(species): Promise<Pokemon[]> {
    let list = [];
    let promises = species.map(specie => {
      return axios.get(`${this.BASE_URL}pokemon/${specie.name}`)
      .then(response => response.data)
      .then(pokemon => {
        list.push(this.createPokemonObject(pokemon));
      });
    });
    return Promise.all(promises).then(() => list.sort((first, second): number => {
        if (first.id < second.id) return -1;
        if (first.id > second.id) return 1;
        return 0;
      })
    );
  }

  private createPokemonObject(pokemon: any): Pokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(t => t.type.name),
      small_image: pokemon.sprites.front_default,
      large_image: pokemon.sprites.other["official-artwork"].front_default,
      evolutions: []
    };
  }

  private fillTypeDetails(): void {
    const typesInRegion = this.region.types.map(t => t.name);
    const filterTypes = (types: any[]) => {
      return types.map(t => t.name).filter(t => typesInRegion.includes(t));
    };
    this.region.types.map(type => {
      axios.get(type.url)
      .then(response => response.data.damage_relations)
      .then(relations => {
        type.double_damage_from = filterTypes(relations.double_damage_from);
        type.double_damage_to = filterTypes(relations.double_damage_to);
        type.half_damage_from = filterTypes(relations.half_damage_from);
        type.half_damage_to = filterTypes(relations.half_damage_to);
        type.no_damage_from = filterTypes(relations.no_damage_from);
        type.no_damage_to = filterTypes(relations.no_damage_to);
      });
    });
  }



}
