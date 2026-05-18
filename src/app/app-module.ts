import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { Idioma } from './idioma/idioma';
import { RouterModule } from '@angular/router';
import { LoginAdministrador } from './login-administrador/login-administrador';
import { LoginUsuario } from './login-usuario/login-usuario';
import { CrearCuentaUsuario } from './crearcuenta-usuario/crearcuenta-usuario';
import { MapaPrincipal } from './mapa-principal/mapa-principal';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminPokemon } from './admin-pokemon/admin-pokemon';
import { AdminAtaques } from './admin-ataques/admin-ataques';
import { AdminObjetos } from './admin-objetos/admin-objetos';
import { AdminEntrenadores } from './admin-entrenadores/admin-entrenadores';

import { Pokemon } from './pokemon/pokemon';
import { CentroPokemon } from './centro-pokemon/centro-pokemon';
import { ProfesorOakPresentacion } from './profesor-oak-presentacion/profesor-oak-presentacion';
import { CajaDialogo } from './caja-dialogo/caja-dialogo';

@NgModule({
  declarations: [
    App,
    Inicio,
    Idioma,
    LoginAdministrador,
    LoginUsuario,
    CrearCuentaUsuario,
    MapaPrincipal,
    AdminPokemon,
    AdminAtaques,
    AdminObjetos,
    AdminEntrenadores,
    CajaDialogo,
    ProfesorOakPresentacion,
    Pokemon,
    CentroPokemon,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule, FormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
