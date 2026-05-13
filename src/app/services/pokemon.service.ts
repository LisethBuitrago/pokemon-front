import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonModel } from '../models/pokemon.model';
import { GritoPokemonModel } from '../models/grito-pokemon.model';
import { SpriteItemModel } from '../models/sprite-item.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Registra un nuevo Pokémon capturado por un usuario
   * POST /pokemon/capturar
   */
  capturarPokemon(
    pokeApiId: number,
    apodo: string,
    nivel: number,
    experienciaAcumulada: number,
    saludActual: number,
    saludMaxima: number,
    nombreAtaque1: string,
    nombreAtaque2: string,
    nombreAtaque3: string,
    nombreAtaque4: string,
    idUsuarioPropietario: number,
    estado: string
  ) {
    return this.cliente.post(
      this.urlbase + '/pokemon/capturar?pokeApiId=' + pokeApiId +
      '&apodo=' + encodeURIComponent(apodo) +
      '&nivel=' + nivel +
      '&experienciaAcumulada=' + experienciaAcumulada +
      '&saludActual=' + saludActual +
      '&saludMaxima=' + saludMaxima +
      '&nombreAtaque1=' + encodeURIComponent(nombreAtaque1) +
      '&nombreAtaque2=' + encodeURIComponent(nombreAtaque2) +
      '&nombreAtaque3=' + encodeURIComponent(nombreAtaque3) +
      '&nombreAtaque4=' + encodeURIComponent(nombreAtaque4) +
      '&idUsuarioPropietario=' + idUsuarioPropietario +
      '&estado=' + encodeURIComponent(estado),
      null,
      { responseType: 'text' }
    );
  }

  /**
   * Retorna todos los Pokémon registrados en la base de datos global
   * GET /pokemon/mostrartodo
   */
  mostrarTodos() {
    return this.cliente.get<PokemonModel[]>(this.urlbase + '/pokemon/mostrartodo', {
      observe: 'response',
    });
  }

  /**
   * Actualiza las estadísticas de un Pokémon
   * PUT /pokemon/actualizar
   */
  actualizarPokemon(
    id: number,
    apodo: string,
    nivel: number,
    experienciaAcumulada: number,
    saludActual: number,
    saludMaxima: number,
    nombreAtaque1: string,
    nombreAtaque2: string,
    nombreAtaque3: string,
    nombreAtaque4: string,
    estado: string
  ) {
    return this.cliente.put(
      this.urlbase + '/pokemon/actualizar?id=' + id +
      '&apodo=' + encodeURIComponent(apodo) +
      '&nivel=' + nivel +
      '&experienciaAcumulada=' + experienciaAcumulada +
      '&saludActual=' + saludActual +
      '&saludMaxima=' + saludMaxima +
      '&nombreAtaque1=' + encodeURIComponent(nombreAtaque1) +
      '&nombreAtaque2=' + encodeURIComponent(nombreAtaque2) +
      '&nombreAtaque3=' + encodeURIComponent(nombreAtaque3) +
      '&nombreAtaque4=' + encodeURIComponent(nombreAtaque4) +
      '&estado=' + encodeURIComponent(estado),
      null,
      { responseType: 'text' }
    );
  }

  /**
   * Libera un Pokémon (lo elimina de la base de datos)
   * DELETE /pokemon/liberar
   */
  liberarPokemon(id: number) {
    return this.cliente.delete(this.urlbase + '/pokemon/liberar?id=' + id, {
      responseType: 'text',
    });
  }



  /**
   * Busca todos los Pokémon que pertenecen a un mismo jugador
   * GET /pokemon/buscarporentrenador
   */
  buscarPorEntrenador(idUsuarioPropietario: number) {
    return this.cliente.get<PokemonModel[]>(
      this.urlbase + '/pokemon/buscarporentrenador?idUsuarioPropietario=' + idUsuarioPropietario,
      { observe: 'response' }
    );
  }

  /**
   * Busca un Pokémon por su apodo
   * GET /pokemon/buscarporapodo
   */
  buscarPorApodo(apodo: string) {
    return this.cliente.get<PokemonModel[]>(
      this.urlbase + '/pokemon/buscarporapodo?apodo=' + encodeURIComponent(apodo),
      { observe: 'response' }
    );
  }


  /**
   * Obtiene el sprite de frente del Pokémon
   * GET /pokemon/{id}/sprites/front
   */
  getSpriteFrente(id: number) {
    return this.cliente.get<SpriteItemModel>(
      this.urlbase + '/pokemon/' + id + '/sprites/front',
      { observe: 'response' }
    );
  }

  /**
   * Obtiene el sprite de atrás del Pokémon
   * GET /pokemon/{id}/sprites/back
   */
  getSpriteAtras(id: number) {
    return this.cliente.get<SpriteItemModel>(
      this.urlbase + '/pokemon/' + id + '/sprites/back',
      { observe: 'response' }
    );
  }


  /**
   * Obtiene el grito del Pokémon (sonido)
   * GET /pokemon/{id}/grito
   */
  getGrito(id: number) {
    return this.cliente.get<GritoPokemonModel>(
      this.urlbase + '/pokemon/' + id + '/grito',
      { observe: 'response' }
    );
  }


  /**
   * Obtiene la historia del Pokémon traducida al idioma seleccionado
   * GET /pokemon/{id}/historia?idioma={idioma}
   */
  obtenerHistoriaTraducida(id: number, idioma: string) {
    return this.cliente.get(
      this.urlbase + '/pokemon/' + id + '/historia?idioma=' + encodeURIComponent(idioma),
      { observe: 'response', responseType: 'text' }
    );
  }
}
