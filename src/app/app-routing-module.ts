import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Idioma } from './idioma/idioma';
import { Inicio } from './inicio/inicio';
import { LoginAdministrador } from './login-administrador/login-administrador';
import { LoginUsuario } from './login-usuario/login-usuario';
import { CrearcuentaUsuario } from './crearcuenta-usuario/crearcuenta-usuario';
import { AdminPokemon } from './admin-pokemon/admin-pokemon';
import { AdminAtaques } from './admin-ataques/admin-ataques';
import { AdminObjetos } from './admin-objetos/admin-objetos';
import { AdminEntrenadores } from './admin-entrenadores/admin-entrenadores'; // <-- Faltaba importar

const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'idioma', component: Idioma },
  { path: 'login-administrador', component: LoginAdministrador },
  { path: 'login-usuario', component: LoginUsuario },
  { path: 'crearcuenta-usuario', component: CrearcuentaUsuario },
  { path: 'admin-pokemon', component: AdminPokemon },
  { path: 'admin-ataques', component: AdminAtaques },
  { path: 'admin-objetos', component: AdminObjetos },
  { path: 'admin-entrenadores', component: AdminEntrenadores },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
