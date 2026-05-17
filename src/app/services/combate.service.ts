import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CombateModel } from '../models/combate.model'; // Recuerda definir esta interfaz según CombateDTO

@Injectable({
  providedIn: 'root',
})
export class CombateService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/combate';

  /**
   * Registra un nuevo pokemon enviando el objeto CombateDTO en el cuerpo.
   * Basado en: @PostMapping("/registrar")
   */
  registrarCombate(datosCombate: CombateModel) {
    return this.cliente.post<CombateModel>(
      `${this.urlbase}/registrar`,
      datosCombate,
      { observe: 'response' }
    );
  }

  /**
   * Obtiene la lista de combates de un usuario por su ID.
   * Basado en: @GetMapping("/historial") con @RequestParam Long idUser
   */
  obtenerHistorial(idUser: number) {
    return this.cliente.get<CombateModel[]>(
      `${this.urlbase}/historial?idUser=${idUser}`,
      { observe: 'response' }
    );
  }
}
