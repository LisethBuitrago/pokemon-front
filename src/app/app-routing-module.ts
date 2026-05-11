import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Idioma} from './idioma/idioma';
import {Inicio} from './inicio/inicio';

const routes: Routes = [
  { path: '', component: Inicio },
  {path: 'idioma', component:Idioma}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
