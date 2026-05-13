import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CentroPokemonService {
  private cliente = inject(HttpClient);
  // Base URL ajustada al RequestMapping del controlador
  private readonly urlbase: string = 'http://localhost:8080/centropokemon';

  /**
   * Envía una petición para curar un Pokémon por su ID.
   * Basado en: @PostMapping("/curar") con @RequestParam long idPokemon
   * * @param idPokemon El identificador único del Pokémon a curar
   * @returns Observable con la respuesta del servidor (texto: "Curado" o "No encontrado")
   */
  curarPokemon(idPokemon: number) {
    return this.cliente.post(
      `${this.urlbase}/curar?idPokemon=${idPokemon}`,
      null, // No hay cuerpo (body) ya que se usa @RequestParam
      {
        observe: 'response',
        responseType: 'text' // Se usa text porque el controlador devuelve un String
      }
    );
  }
}
