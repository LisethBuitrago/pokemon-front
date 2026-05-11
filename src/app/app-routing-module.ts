import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Idioma } from './idioma/idioma';
import { Inicio } from './inicio/inicio';
import { LoginAdministrador } from './login-administrador/login-administrador';

const routes: Routes = [

  { path: '', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'idioma', component: Idioma },
  {path: 'login-administrador', component: LoginAdministrador },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
