import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idioma',
  standalone: false,
  templateUrl: './idioma.html',
  styleUrl: './idioma.css',
})
export class Idioma {
  private router = inject(Router);
  estaCargando = false;
  mapa: string = 'https://i.pinimg.com/474x/1f/54/8b/1f548b23b9593e31b58d2e23c70f2293.jpg';

  // seleccionar idioma att:lis
  opcionSeleccionada: number | null = null;

  seleccionarIdioma(idioma: string) {
    let audioBoton = new Audio();
    audioBoton.src = 'botones.mp3';
    audioBoton.load();
    audioBoton.play();
    console.log('Idioma elegido:', idioma);
    localStorage.setItem('idiomaTemporal', idioma);
    this.estaCargando = true;
    setTimeout(() => {
      this.router.navigate(['/login-usuario']);
    }, 800);
  }
}
