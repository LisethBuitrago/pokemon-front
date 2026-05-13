import { EstadisticaPokemonModel } from "./estadistica-pokemon.model";
import { AtaquePokemonModel } from "./ataque-pokemon.model";
import { SpriteModel } from "./sprite.model";
import { TipoPokemonModel } from "./tipo-pokemon.model";
import { GritoPokemonModel } from "./grito-pokemon.model";

export interface InformacionPokemonModel {
  id: number;
  nombre: string;
  peso: number;
  listaEstadisticas: EstadisticaPokemonModel[];
  listaAtaques: AtaquePokemonModel[];
  imagenes: SpriteModel;
  listaTipos: TipoPokemonModel[];
  sonidos: GritoPokemonModel;
}
