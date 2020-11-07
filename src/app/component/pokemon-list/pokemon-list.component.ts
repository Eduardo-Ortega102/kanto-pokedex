import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  @Input() pokemon_list: Pokemon[];
  @Output() notifyPokemonClicked = new EventEmitter();

  constructor() {}

  public displayPokemon(pokemon): void {
    this.notifyPokemonClicked.emit(pokemon);
  }

}
