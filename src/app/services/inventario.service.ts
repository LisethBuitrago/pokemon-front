import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventarioModel } from '../models/inventario.model'; // Asegúrate de definir este modelo según InventarioDTO

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private cliente = inject(HttpClient);
  // Base URL definida en el RequestMapping del controlador
  private readonly urlbase: string = 'http://localhost:8080/inventario';

  /**
   * Obtiene la lista de ítems (mochila) de un usuario por su ID.
   * Basado en: @GetMapping("/mochila") con @RequestParam Long idUsuario
   * @param idUsuario El identificador del usuario para consultar su inventario
   */
  verMochila(idUsuario: number) {
    return this.cliente.get<InventarioModel[]>(
      `${this.urlbase}/mochila?idUsuario=${idUsuario}`,
      { observe: 'response' }
    );
  }
}
