import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crearcuenta-usuario',
  standalone: false,
  templateUrl: './crearcuenta-usuario.html',
  styleUrl: './crearcuenta-usuario.css',
})
export class CrearCuentaUsuario {
  private router = inject(Router);
  private authService = inject(AuthService);

  pokeball: string = 'https://art.pixilart.com/60a7c101219ee5f.png';
  correoIcono: string =
    'https://static.vecteezy.com/system/resources/previews/072/539/271/non_2x/pixel-art-mail-email-envelope-icon-illustration-free-png.png';
  key: string =
    'https://img.magnific.com/vector-premium/elemento-juego-key-pixel-art-clave-pixel-juego_158677-595.jpg';

  nombre: string = '';
  correo: string = '';
  contrasenia: string = '';

  seleccionarOpcion(opcion: string) {
    const audioBoton = new Audio('botones.mp3');
    audioBoton.play().catch((err) => console.log('Esperando interacción para sonar'));

    if (opcion === 'registrar') {
      if (!this.nombre || !this.correo || !this.contrasenia) {
        alert('¡Por favor llena todos los campos de tu tarjeta de entrenador!');
        return;
      }

      const idiomaSeleccionado = localStorage.getItem('idiomaTemporal') || 'es';

      const payload = {
        nombre: this.nombre,
        correo: this.correo,
        contrasenia: this.contrasenia,
        rol: 'USUARIO',
        idiomaPreferido: idiomaSeleccionado,
        dinero: 3000,
      };

      this.authService.registrarUsuario(payload).subscribe({
        next: (response) => {
          alert('¡Registro exitoso! Cuenta creada en el sistema.');
          this.router.navigate(['/login-usuario']);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 409) {
            alert('Error: Ese nombre de entrenador ya está en uso.');
          } else {
            alert('No se pudo completar el registro. Intenta de nuevo.');
          }
        },
      });
    } else if (opcion === 'login') {
      this.router.navigate(['/login-usuario']);
    }
  }
}
