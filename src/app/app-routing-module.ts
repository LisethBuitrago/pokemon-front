import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Idioma } from './idioma/idioma';
import { Inicio } from './inicio/inicio';
import { LoginAdministrador } from './login-administrador/login-administrador';
import { AdminPokemon } from './admin-pokemon/admin-pokemon';
import { AdminAtaques } from './admin-ataques/admin-ataques';

const routes: Routes = [

  { path: '', component: Inicio },
  { path: 'inicio', component: Inicio },
  { path: 'idioma', component: Idioma },
  {path: 'login-administrador', component: LoginAdministrador },
  { path: 'admin/pokemon', component: AdminPokemon },
  { path: 'admin-ataques', component: AdminAtaques },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
