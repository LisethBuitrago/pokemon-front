import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private cliente = inject(HttpClient);
  // Base URL siguiendo el RequestMapping del controlador
  private readonly urlbase: string = 'http://localhost:8080/tienda';

  /**
   * Realiza la compra de un ítem para un usuario específico.
   * Basado en: @PostMapping("/comprar") con @RequestParam idUsuario e idItem
   * @param idUsuario ID del usuario que realiza la compra
   * @param idItem ID del ítem que se desea adquirir
   */
  comprarItem(idUsuario: number, idItem: number) {
    return this.cliente.post(
      `${this.urlbase}/comprar?idUsuario=${idUsuario}&idItem=${idItem}`,
      null, // El cuerpo de la petición va vacío ya que se usan parámetros de URL
      {
        observe: 'response',
        responseType: 'text' // Se usa text porque el controlador devuelve Strings directamente
      }
    );
  }
}
