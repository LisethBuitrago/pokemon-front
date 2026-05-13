import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AtaqueModel } from '../models/ataque.model'; // Asegúrate de crear este modelo

@Injectable({
  providedIn: 'root',
})
export class AtaqueService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/ataque';

  // Obtener todos los ataques
  getAtaques() {
    return this.cliente.get<AtaqueModel[]>(this.urlbase + '/mostrartodo', {
      observe: 'response',
    });
  }

  // Método específico solicitado: Banear un ataque
  // Basado en tu controlador de Spring Boot: @PostMapping("/banear")
  banearAtaque(nombre: string) {
    return this.cliente.post(
      this.urlbase + '/banear?nombre=' + encodeURIComponent(nombre),
      null,
      { responseType: 'text' }
    );
  }

  // Crear un ataque
  crearAtaque(nombre: string, tipo: string, potencia: number, precision: number) {
    return this.cliente.post(
      this.urlbase + '/crear?nombre=' + encodeURIComponent(nombre) +
      '&tipo=' + encodeURIComponent(tipo) +
      '&potencia=' + potencia +
      '&precision=' + precision,
      null,
      { responseType: 'text' }
    );
  }

  // Actualizar un ataque
  actualizarAtaque(id: number, nombre: string, tipo: string, potencia: number) {
    return this.cliente.put(
      this.urlbase + '/actualizar?id=' + id +
      '&nombre=' + encodeURIComponent(nombre) +
      '&tipo=' + encodeURIComponent(tipo) +
      '&potencia=' + potencia,
      null,
      { responseType: 'text' }
    );
  }

  // Eliminar un ataque
  eliminarAtaque(id: number) {
    return this.cliente.delete(this.urlbase + '/eliminar?id=' + id, {
      responseType: 'text',
    });
  }

  // Buscar por tipo
  buscarPorTipo(tipo: string) {
    return this.cliente.get<AtaqueModel[]>(this.urlbase + '/buscarportipo?tipo=' + encodeURIComponent(tipo), {
      observe: 'response',
    });
  }
}
