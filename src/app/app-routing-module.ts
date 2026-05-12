import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Idioma } from './idioma/idioma';
import { Inicio } from './inicio/inicio';
import { LoginAdministrador } from './login-administrador/login-administrador';
import {LoginUsuario} from './login-usuario/login-usuario';
import {CrearcuentaUsuario} from './crearcuenta-usuario/crearcuenta-usuario';

const routes: Routes = [

  { path: '', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'idioma', component: Idioma },
  {path: 'login-administrador', component: LoginAdministrador },
  {path: 'login-usuario', component: LoginUsuario},
  {path: 'crearcuenta-usuario', component: CrearcuentaUsuario},
  { path: '**', redirectTo: '' },  //esta linea siempre debe ir a lo ultimo att:lis
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
