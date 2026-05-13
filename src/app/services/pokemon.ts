import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Esta interfaz debe ser igual a tu PokemonDTO de Spring Boot
export interface PokemonDTO {
  id: number;
  pokeApiId: number;
  apodo: string;
  nivel: number;
  experienciaAcumulada: number;
  saludActual: number;
  saludMaxima: number;
  nombreAtaque1: string;
  nombreAtaque2: string;
  nombreAtaque3: string;
  nombreAtaque4: string;
  idUsuarioPropietario: number;
  estado: string;
}

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible en toda la app
})
export class PokemonService {
  private http = inject(HttpClient);

  // URL de tu controlador en Spring Boot
  private url = 'http://localhost:8080/pokemon';

  // Traer la lista para tu tabla GBA
  getTodos(): Observable<PokemonDTO[]> {
    return this.http.get<PokemonDTO[]>(`${this.url}/mostrartodo`);
  }
}
