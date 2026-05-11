import {Component, OnInit, inject, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit, OnDestroy{
  //personajes para la pantalla principal att:lis
  url: string = "https://static.wikia.nocookie.net/espokemon/images/9/95/Charizard.png/revision/latest/scale-to-width-down/1200?cb=20180325003352";
  personaje1: string= "https://static.wikia.nocookie.net/espokemon/images/7/72/Rojo_RFVH_%28Ilustraci%C3%B3n%29.png/revision/latest/scale-to-width/360?cb=20091129174930";
  personaje2: string="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/0f/latest/20230923192217/Azul_en_RFVH.png/180px-Azul_en_RFVH.png";
  personaje4: string="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/Microsites/Pokemon%20LeafGreen%20and%20FireRed/image_2_desktop";
  personaje3: string="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png";


  //musica pantalla principal y press start att:lis

  estaCargando = false;

  private router = inject(Router);
  musicaFondo = new Audio('musicaprincipal.mp3');

  ngOnInit() {
    this.musicaFondo.loop = true;
    this.musicaFondo.volume = 0.3;
  }

  reproducirMusicaFondo() {
   this.musicaFondo.play().catch(err => console.log('Esperando interacción del usuario para reproducir audio'));
  }


  presionarStart() {

    let audioBoton = new Audio();
    audioBoton.src = "botones.mp3";
    audioBoton.load();
    this.estaCargando = true;
    audioBoton.play();

    setTimeout(() => {
      this.router.navigate(['/idioma']);
    }, 800);
  }

  ngOnDestroy() {
    if (this.musicaFondo) {
      this.musicaFondo.pause();
      this.musicaFondo.currentTime = 0;
    }
  }

//boton escondido att:lis
  easterEgg() {
    console.log("Sirve");
    this.estaCargando = true;
    setTimeout(() => {
      this.router.navigate(['/login-administrador']);
    }, 800) ;
  }
}
