import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pokemon',
  standalone: false, // <-- IMPORTANTE
  templateUrl: './admin-pokemon.html',
  styleUrl: './admin-pokemon.css',
  // ELIMINAMOS la línea de imports de aquí
})
export class AdminPokemon {
  private router = inject(Router);

  textoBusqueda: string = '';
  pokemonSeleccionado: string = '037';

  listaPokemon = [
    { id: '032', genero: '♀', nombre: 'NIDORAN', tipos: ['VENENO'], activo: true },
    { id: '033', genero: '♂', nombre: 'NIDORINO', tipos: ['VENENO', 'TIERRA'], activo: true },
    { id: '035', genero: '  ', nombre: 'MELOFEE', tipos: ['NORMAL'], activo: true },
    { id: '036', genero: '  ', nombre: '--------', tipos: [], activo: true },
    { id: '037', genero: '  ', nombre: 'GOUPIX', tipos: ['FUEGO'], activo: true },
    { id: '038', genero: '  ', nombre: 'FEUNARD', tipos: ['FUEGO'], activo: true },
    { id: '039', genero: '  ', nombre: 'RONDOUDOU', tipos: ['NORMAL'], activo: true },
  ];

  get listaFiltrada() {
    return this.listaPokemon.filter(
      (p) =>
        p.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        p.id.includes(this.textoBusqueda),
    );
  }

  seleccionarPokemon(id: string) {
    this.pokemonSeleccionado = id;
  }

  irAPokemon() { this.router.navigate(['/admin-pokemon']); }
  irAAtaques() { this.router.navigate(['/admin-ataques']); }
  irAObjetos() { this.router.navigate(['/admin-objetos']); }
  irAEntrenadores() { this.router.navigate(['/admin-entrenadores']); }

  irADetalles() {
    console.log('Editando al Pokémon ID:', this.pokemonSeleccionado);
    this.router.navigate(['/admin-pokemon-detalle']);
  }

  cerrarSesion() {
    let audio = new Audio('botones.mp3');
    audio.play().catch((e) => console.log('Audio error'));
    this.router.navigate(['/login-administrador']);
  }
}
