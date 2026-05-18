import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-usuario',
  standalone: false,
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  private router = inject(Router);
  private authService = inject(AuthService);

  pokeball: string = "https://art.pixilart.com/60a7c101219ee5f.png";
  correoIcono: string = "https://static.vecteezy.com/system/resources/previews/072/539/271/non_2x/pixel-art-mail-email-envelope-icon-illustration-free-png.png";
  key: string = "https://img.magnific.com/vector-premium/elemento-juego-key-pixel-art-clave-pixel-juego_158677-595.jpg";

  correo: string = '';
  contrasenia: string = '';

  seleccionarOpcion(opcion: string) {
    const audioBoton = new Audio("botones.mp3");
    audioBoton.play().catch(err => console.log("Esperando interacción para sonar"));

    if (opcion === 'entrar') {
      if (!this.correo || !this.contrasenia) {
        alert("¡Ingresa tu correo y contraseña de entrenador!");
        return;
      }

      const credenciales = {
        correo: this.correo,
        contrasenia: this.contrasenia
      };

      this.authService.login(credenciales).subscribe({
        next: (response) => {
          this.authService.guardarSesion(response.token, response.role, response.id, response.nombre);
          this.router.navigate(['/profesor-oak-presentacion']);
        },
        error: (err) => {
          console.error(err);
          alert("Error: Correo o contraseña incorrectos en el sistema.");
        }
      });
    }
    else if (opcion === 'registrarse') {
      this.router.navigate(['/crearcuenta-usuario']);
    }
  }
}
