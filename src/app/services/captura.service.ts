import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapturaModel } from '../models/captura.model'; // Asegúrate de definir este modelo/interface

@Injectable({
  providedIn: 'root',
})
export class CapturaService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/captura';

  /**
   * Registra una nueva captura enviando el objeto CapturaDTO en el body.
   * Basado en: @PostMapping("/registrar")
   */
  registrarCaptura(nuevaCaptura: CapturaModel) {
    return this.cliente.post<CapturaModel>(
      `${this.urlbase}/registrar`,
      nuevaCaptura,
      { observe: 'response' }
    );
  }

  /**
   * Obtiene el historial de capturas de un usuario específico.
   * Basado en: @GetMapping("/historial")
   */
  obtenerHistorial(idUsuario: number) {
    return this.cliente.get<CapturaModel[]>(
      `${this.urlbase}/historial?idUsuario=${idUsuario}`,
      { observe: 'response' }
    );
  }
}
