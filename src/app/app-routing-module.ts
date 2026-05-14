import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Idioma } from './idioma/idioma';
import { Inicio } from './inicio/inicio';
import { LoginAdministrador } from './login-administrador/login-administrador';
import {LoginUsuario} from './login-usuario/login-usuario';
import { MapaPrincipal } from './mapa-principal/mapa-principal';
import { AdminObjetos } from './admin-objetos/admin-objetos';
import { AdminAtaques } from './admin-ataques/admin-ataques';
import { AdminEntrenadores } from './admin-entrenadores/admin-entrenadores';
import { AdminPokemon } from './admin-pokemon/admin-pokemon';
import { CrearCuentaUsuario } from './crearcuenta-usuario/crearcuenta-usuario';
import { CajaDialogo } from './caja-dialogo/caja-dialogo';
import { ProfesorOakPresentacion } from './profesor-oak-presentacion/profesor-oak-presentacion';

const routes: Routes = [

  { path: '', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'idioma', component: Idioma },
  {path: 'login-administrador', component: LoginAdministrador },
  {path: 'login-usuario', component: LoginUsuario},
  {path: 'crearcuenta-usuario', component: CrearCuentaUsuario},
  {path: 'mapa-principal', component: MapaPrincipal},
  { path: 'admin-pokemon', component: AdminPokemon },
  { path: 'admin-entrenadores', component: AdminEntrenadores },
  { path: 'admin-ataques', component: AdminAtaques },
  { path: 'admin-objetos', component: AdminObjetos },
  {path: 'caja-dialogo', component: CajaDialogo},
  {path: 'profesor-oak-presentacion', component: ProfesorOakPresentacion},
  { path: '**', redirectTo: '' }, //esta linea siempre va a lo ultimo att:lis
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
