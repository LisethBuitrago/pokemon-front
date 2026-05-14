import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crearcuenta-usuario',
  standalone: false,
  templateUrl: './crearcuenta-usuario.html',
  styleUrl: './crearcuenta-usuario.css',
})
export class CrearCuentaUsuario {
  private router: Router = inject(Router);
  pokeball: string = "https://art.pixilart.com/60a7c101219ee5f.png";
  correo: string = "https://static.vecteezy.com/system/resources/previews/072/539/271/non_2x/pixel-art-mail-email-envelope-icon-illustration-free-png.png";
  key: string = "https://img.magnific.com/vector-premium/elemento-juego-key-pixel-art-clave-pixel-juego_158677-595.jpg";



  seleccionarOpcion(opcion: string) {
    const audioBoton = new Audio("botones.mp3");
    audioBoton.play().catch(err => console.log("Esperando interacción para sonar"));
    console.log("Opción elegida:", opcion);

    setTimeout(() => {
      if (opcion === 'registrar') {
        this.router.navigate(['/login-usuario']);
      }
      else if (opcion === 'login') {
        this.router.navigate(['/login-usuario']);
      }
    }, 800);
  }
}
