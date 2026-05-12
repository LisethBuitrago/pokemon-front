import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pokemon',
  standalone: false,
  templateUrl: './admin-pokemon.html',
  styleUrl: './admin-pokemon.css'
})
export class AdminPokemon {
  private router = inject(Router);

  // El Pokémon que está apuntado con la flechita ▶
  pokemonSeleccionado: string = '037';

  // Datos quemados para simular la base de datos
  listaPokemon = [
    { id: '032', genero: '♀', nombre: 'NIDORAN', tipos: ['VENENO'], activo: true },
    { id: '033', genero: '♂', nombre: 'NIDORINO', tipos: ['VENENO', 'TIERRA'], activo: true },
    { id: '035', genero: '  ', nombre: 'MELOFEE', tipos: ['NORMAL'], activo: true },
    { id: '036', genero: '  ', nombre: '--------', tipos: [], activo: true },
    { id: '037', genero: '  ', nombre: 'GOUPIX', tipos: ['FUEGO'], activo: true },
    { id: '038', genero: '  ', nombre: 'FEUNARD', tipos: ['FUEGO'], activo: true },
    { id: '039', genero: '  ', nombre: 'RONDOUDOU', tipos: ['NORMAL'], activo: true },
  ];

  seleccionarPokemon(id: string) {
    this.pokemonSeleccionado = id;
  }

  cerrarSesion() {
    // Sonido de salida y redirección al login
    let audio = new Audio('botones.mp3');
    audio.play().catch(e => console.log('Audio error'));
    this.router.navigate(['/login-administrador']);
  }

  irADetalles() {
    // Aquí luego programaremos la redirección a la pantalla de edición
    console.log("Editando al Pokémon ID:", this.pokemonSeleccionado);
    alert(`Redirigiendo a detalles del Pokémon N°${this.pokemonSeleccionado}`);
  }
  // Dentro de la clase AdminPokemon
  irAAtaques() {
    console.log("Navegando a ataques...");
    this.router.navigate(['/admin-ataques']);
  }

  irAPokemon() {
    this.router.navigate(['/admin-pokemon']);
  }
}
