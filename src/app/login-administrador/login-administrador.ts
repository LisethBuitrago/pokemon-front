import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-administrador',
  standalone: false,
  templateUrl: './login-administrador.html',
  styleUrl: './login-administrador.css',
})
export class LoginAdministrador {
  usuario: string = '';
  contrasena: string = '';
  errorLogin: boolean = false;
  estaCargando: boolean = false;

  private router = inject(Router);

  pokeballs: string[] = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
  ];

  volverInicio() {
    const audioBoton = new Audio("botones.mp3");
    audioBoton.play().catch(e => {});
    this.router.navigate(['/inicio']); // Cambia '/inicio' por tu ruta principal
  }

  iniciarSesion() {
    const audioBoton = new Audio("botones.mp3");
    audioBoton.play().catch(e => {});

    if (this.usuario === 'admin' && this.contrasena === '1234') {
      this.errorLogin = false;
      this.estaCargando = true;

      setTimeout(() => {
        this.router.navigate(['/admin-pokemon']);
      }, 800);
    } else {
      this.errorLogin = true;
    }
  }
}
