import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { Idioma } from './idioma/idioma';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [App, Inicio, Idioma],
  imports: [BrowserModule, AppRoutingModule,RouterModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})


export class AppModule {}
