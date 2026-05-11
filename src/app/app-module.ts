import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { Idioma } from './idioma/idioma';
import { RouterModule } from '@angular/router';
import { LoginAdministrador } from './login-administrador/login-administrador';

@NgModule({
  declarations: [App, Inicio, Idioma, LoginAdministrador],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
