import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-administrador',
  standalone: false,
  templateUrl: './login-administrador.html',
  styleUrl: './login-administrador.css',
})
export class LoginAdministrador {
  // Variables del formulario
  usuario: string = '';
  contrasena: string = '';
  errorLogin: boolean = false;

  // Variables de UI
  estaCargando: boolean = false;
  private router = inject(Router);

  // Imágenes retro (Gifs/Sprites)
  pikachuImg: string = 'https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif';
  charmanderImg: string =
    'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif';

  // Arreglo de Pokéballs para el footer decorativo
  pokeballs: string[] = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
  ];

  iniciarSesion() {
    if (this.usuario === 'admin' && this.contrasena === '1234') {
      this.estaCargando = true;

      setTimeout(() => {
        this.router.navigate(['/admin/pokemon']);
      }, 800);
    } else {
      this.errorLogin = true;
    }
  }
}
