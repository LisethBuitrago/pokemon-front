import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { Idioma } from './idioma/idioma';
import { RouterModule } from '@angular/router';
import { LoginAdministrador } from './login-administrador/login-administrador';
import { FormsModule } from '@angular/forms';
import { AdminPokemon } from './admin-pokemon/admin-pokemon';
import { AdminAtaques } from './admin-ataques/admin-ataques';

@NgModule({
  declarations: [App, Inicio, Idioma, LoginAdministrador, AdminPokemon, AdminAtaques],
  imports: [BrowserModule, AppRoutingModule, RouterModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
