import {Component, inject} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  standalone: false,
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  private router: Router = inject(Router);
 //imagenes att:lis
  pokeball: string = "https://art.pixilart.com/60a7c101219ee5f.png"
  key: string ="https://img.magnific.com/vector-premium/elemento-juego-key-pixel-art-clave-pixel-juego_158677-595.jpg"


  //reproducir sonidos de botones att:lis
  seleccionarOpcion(opcion: string) {
    const audioBoton = new Audio("botones.mp3");
    audioBoton.play().catch(err => console.log("Esperando interacción para sonar"));
    console.log("Opción elegida:", opcion);
    setTimeout(() => {
      if (opcion === 'entrar') {
        this.router.navigate(['/profesor-oak-presentacion']);
      }
      else if (opcion === 'registrarse') {
        this.router.navigate(['/crearcuenta-usuario']);
      }
    }, 800);
  }

}
