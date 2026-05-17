import { Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-mapa-principal',
  standalone: false,
  templateUrl: './mapa-principal.html',
  styleUrl: './mapa-principal.css',
})
export class MapaPrincipal implements OnInit, OnDestroy {
  private juegoService = inject(JuegoService);

  spritePersonajeMujer = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/green_manga_by_miused_dfz6h8l_ntt5ih";
  spritePersonajeHombre = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/overworld_sprite_template_for_pokemon_games_by_cynthiacelestic_d8h0v36_cpg5j4";

  spriteActual = '';

  paso = 32;
  anchoMapa = 1024;
  altoMapa = 768;
  anchoVista = 800;
  altoVista = 600;

  pX = 608;
  pY = 192;

  camaraX = 0; camaraY = 0;
  spriteX = 0; spriteY = 0;
  transicionActiva = false;
  estaMoviendose = false;
  velocidadPaso = 100;

  anchoFrame = 32;
  altoFrame = 48;
  frameX = 0;
  frameY = 0;
  posicionFondo = '0px 0px';

  musicaMapa = new Audio();

  private intervaloCelular: any = null;

  colisiones: number[][] = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,3,1,1,1,3,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,1,1,1,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,3,1,1,0,1,3,1,0,0,0,1,3,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,3,3,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,3,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  ngOnInit() {
    if (this.juegoService.generoSeleccionado === 'mujer') {
      this.spriteActual = this.spritePersonajeMujer;
    } else {
      this.spriteActual = this.spritePersonajeHombre;
    }

    this.actualizarPosicion();
    this.actualizarSprite();

    this.musicaMapa.src = 'mapaprincipal.mp3';
    this.musicaMapa.loop = true;
    this.musicaMapa.load();
    this.musicaMapa.volume = 0.4;
    this.musicaMapa.play().catch(error => console.log("Esperando interacción del usuario para reproducir audio:", error));
  }

  @HostListener('window:keydown', ['$event'])
  moverse(event: KeyboardEvent) {
    const tecla = event.key.toLowerCase();
    this.procesarDireccion(tecla);
  }

  procesarDireccion(tecla: string) {
    if (this.transicionActiva || this.estaMoviendose) return;

    let proximoX = this.pX;
    let proximoY = this.pY;
    let seMovio = false;

    switch (tecla) {
      case 'w': case 'arrowup':    proximoY -= this.paso; this.frameY = 3; seMovio = true; break;
      case 's': case 'arrowdown':  proximoY += this.paso; this.frameY = 0; seMovio = true; break;
      case 'a': case 'arrowleft':  proximoX -= this.paso; this.frameY = 1; seMovio = true; break;
      case 'd': case 'arrowright': proximoX += this.paso; this.frameY = 2; seMovio = true; break;
      default: return;
    }

    if (proximoX < 0 || proximoX >= this.anchoMapa || proximoY < 0 || proximoY >= this.altoMapa) {
      this.actualizarSprite();
      return;
    }

    const colDestino = Math.floor(proximoX / this.paso);
    const filaDestino = Math.floor(proximoY / this.paso);

    const celdaDestino = (this.colisiones[filaDestino] && this.colisiones[filaDestino][colDestino] !== undefined)
      ? this.colisiones[filaDestino][colDestino]
      : 1;

    if (celdaDestino === 1) {
      console.log("Pared detectada en:", filaDestino, colDestino);
      this.actualizarSprite();
      return;
    }

    if (celdaDestino === 3) {
      this.actualizarSprite();
      this.iniciarTransicionMapa();
      return;
    }

    this.estaMoviendose = true;
    this.pX = proximoX;
    this.pY = proximoY;

    if (seMovio) {
      this.frameX = (this.frameX + 1) % 4;
    }

    this.actualizarSprite();
    this.actualizarPosicion();

    setTimeout(() => {
      this.estaMoviendose = false;
    }, this.velocidadPaso);
  }

  iniciarMovimientoCelular(tecla: string) {
    this.detenerMovimientoCelular();
    this.procesarDireccion(tecla);
    this.intervaloCelular = setInterval(() => {
      this.procesarDireccion(tecla);
    }, this.velocidadPaso);
  }

  detenerMovimientoCelular() {
    if (this.intervaloCelular) {
      clearInterval(this.intervaloCelular);
      this.intervaloCelular = null;
    }
  }

  actualizarSprite() {
    const posX = -(this.frameX * this.anchoFrame);
    const posY = -(this.frameY * this.altoFrame);
    this.posicionFondo = `${posX}px ${posY}px`;
  }

  iniciarTransicionMapa() {
    if (this.transicionActiva) return;

    console.log("Iniciando transición");
    this.transicionActiva = true;

    setTimeout(() => {
      if (this.pY < 100) {
        this.pX = 544;
        this.pY = 600;
      } else {
        this.pY += this.paso;
      }

      this.actualizarPosicion();

      setTimeout(() => {
        this.transicionActiva = false;
      }, 500);

    }, 1000);
  }

  actualizarPosicion() {
    this.camaraX = Math.max(0, Math.min(this.anchoMapa - this.anchoVista, this.pX - this.anchoVista / 2));
    this.camaraY = Math.max(0, Math.min(this.altoMapa - this.altoVista, this.pY - this.altoVista / 2));
    this.spriteX = this.pX - this.camaraX;
    this.spriteY = this.pY - this.camaraY;
  }

  ngOnDestroy() {
    this.detenerMovimientoCelular();
    if (this.musicaMapa) {
      this.musicaMapa.pause();
    }
  }
}
