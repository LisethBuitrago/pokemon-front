import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private cliente = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080';

  getUsuarios() {
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/usuario/mostrartodo', {
      observe: 'response',
    });
  }

  crearUsuario(nombre: string, contrasenia: string, correo: string, rol: string, idiomaPreferido: string, dinero: number) {
    return this.cliente.post(
      this.urlbase + '/usuario/crear?nombre=' + encodeURIComponent(nombre) +
      '&contrasenia=' + encodeURIComponent(contrasenia) +
      '&correo=' + encodeURIComponent(correo) +
      '&rol=' + encodeURIComponent(rol) +
      '&idiomaPreferido=' + encodeURIComponent(idiomaPreferido) +
      '&dinero=' + dinero,
      null,
      { responseType: 'text' }
    );
  }

  actualizarUsuario(id: number, nombre: string, contrasenia: string, correo: string, rol: string, idiomaPreferido: string, dinero: number) {
    return this.cliente.put(
      this.urlbase + '/usuario/actualizar?id=' + id +
      '&nombre=' + encodeURIComponent(nombre) +
      '&contrasenia=' + encodeURIComponent(contrasenia) +
      '&correo=' + encodeURIComponent(correo) +
      '&rol=' + encodeURIComponent(rol) +
      '&idiomaPreferido=' + encodeURIComponent(idiomaPreferido) +
      '&dinero=' + dinero,
      null,
      { responseType: 'text' }
    );
  }

  eliminarUsuario(id: number) {
    return this.cliente.delete(this.urlbase + '/usuario/eliminar?id=' + id, {
      responseType: 'text',
    });
  }

  buscarPorNombre(nombre: string) {
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/usuario/buscarpornombre?nombre=' + encodeURIComponent(nombre), {
      observe: 'response',
    });
  }

  buscarPorCorreo(correo: string) {
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/usuario/buscarporcorreo?correo=' + encodeURIComponent(correo), {
      observe: 'response',
    });
  }

  buscarPorRol(rol: string) {
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/usuario/buscarporrol?rol=' + encodeURIComponent(rol), {
      observe: 'response',
    });
  }

  login(correo: string, contrasenia: string) {
    return this.cliente.post(
      this.urlbase + '/usuario/login?correo=' + encodeURIComponent(correo) +
      '&contrasenia=' + encodeURIComponent(contrasenia),
      null,
      { observe: 'response' }
    );
  }
}
