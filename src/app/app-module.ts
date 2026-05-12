import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // <-- Agregado para el *ngFor
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { Idioma } from './idioma/idioma';
import { LoginAdministrador } from './login-administrador/login-administrador';
import { LoginUsuario } from './login-usuario/login-usuario';
import { CrearcuentaUsuario } from './crearcuenta-usuario/crearcuenta-usuario';
import { AdminPokemon } from './admin-pokemon/admin-pokemon';
import { AdminAtaques } from './admin-ataques/admin-ataques';
import { AdminObjetos } from './admin-objetos/admin-objetos';
import { AdminEntrenadores } from './admin-entrenadores/admin-entrenadores';

@NgModule({
  declarations: [
    App,
    Inicio,
    Idioma,
    LoginAdministrador,
    LoginUsuario,
    CrearcuentaUsuario,
    AdminPokemon,
    AdminAtaques,
    AdminObjetos,
    AdminEntrenadores
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
