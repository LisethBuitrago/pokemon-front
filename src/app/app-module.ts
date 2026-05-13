import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { Idioma } from './idioma/idioma';
import { RouterModule } from '@angular/router';
import { LoginAdministrador } from './login-administrador/login-administrador';
import { LoginUsuario } from './login-usuario/login-usuario';
import { CrearcuentaUsuario } from './crearcuenta-usuario/crearcuenta-usuario';
import { MapaPrincipal } from './mapa-principal/mapa-principal';

@NgModule({
  declarations: [
    App,
    Inicio,
    Idioma,
    LoginAdministrador,
    LoginUsuario,
    CrearcuentaUsuario,
    MapaPrincipal,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
