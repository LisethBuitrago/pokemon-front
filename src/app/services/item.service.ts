import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemModel } from '../models/item.model'; // Recuerda definir este modelo según ItemDTO

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private cliente = inject(HttpClient);
  // Manteniendo la base de la URL como en tu servicio de usuario
  private readonly urlbase: string = 'http://localhost:8080';

  /**
   * Obtiene la lista completa de ítems disponibles en el catálogo.
   * Basado en: @GetMapping("/catalogo") dentro de @RequestMapping("/item")
   */
  verCatalogo() {
    return this.cliente.get<ItemModel[]>(this.urlbase + '/item/catalogo', {
      observe: 'response',
    });
  }
}
