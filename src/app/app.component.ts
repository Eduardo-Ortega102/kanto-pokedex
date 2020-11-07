import { Component, OnInit } from '@angular/core';
import { Region, Pokemon } from './pokemon.model';
import { PokemonService } from './services/pokemon.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public region: Region;
  public currentPokemon: Pokemon;

  constructor(private pokemonService: PokemonService){}

  public ngOnInit(): void {
    let t0 = performance.now();
    this.pokemonService.getRegion().then(region => {
      let t1 = performance.now();
      this.region = region;
      console.log(t1-t0)
    });
  }

  public displayPokemon(pokemon: Pokemon): void {
    this.currentPokemon = pokemon;
  }

}
