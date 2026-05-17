import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login-usuario',
  standalone: false,
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  private router: Router = inject(Router);
  private usuarioService: UsuarioService = inject(UsuarioService);

  // Imágenes att:lis
  pokeball: string = 'https://art.pixilart.com/60a7c101219ee5f.png';
  key: string = 'https://img.magnific.com/vector-premium/elemento-juego-key-pixel-art-clave-pixel-juego_158677-595.jpg';

  // Campos del formulario
  correo: string = '';
  contrasenia: string = '';

  // Reproducir sonidos de botones att:lis
  seleccionarOpcion(opcion: string) {
    const audioBoton = new Audio('botones.mp3');
    audioBoton.play().catch(err => console.log('Esperando interacción para sonar'));

    if (opcion === 'entrar') {
      if (!this.correo || !this.contrasenia) {
        alert('Por favor ingresa tu correo y contraseña.');
        return;
      }

      this.usuarioService.login(this.correo, this.contrasenia).subscribe({
        next: (res) => {
          if (res.status === 200) {
            setTimeout(() => {
              this.router.navigate(['/profesor-oak-presentacion']);
            }, 800);
          }
        },
        error: (err) => {
          if (err.status === 404) {
            alert('No existe una cuenta con ese correo.');
          } else if (err.status === 401) {
            alert('Contraseña incorrecta. Intenta de nuevo.');
          } else {
            alert('Error al iniciar sesión. Intenta más tarde.');
          }
        }
      });

    } else if (opcion === 'registrarse') {
      setTimeout(() => {
        this.router.navigate(['/crearcuenta-usuario']);
      }, 800);
    }
  }
}
