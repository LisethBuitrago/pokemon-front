import { Component, HostListener, inject, OnInit } from '@angular/core';
// import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-mapa-principal',
  standalone: false,
  templateUrl: './mapa-principal.html',
  styleUrl: './mapa-principal.css',
})
export class MapaPrincipal implements OnInit {

  paso = 32;
  anchoMapa = 1024;
  altoMapa = 768;
  anchoVista = 800;
  altoVista = 600;

  pX = 608;
  pY = 192;

  spriteActual = 'assets/sprites/chico-abajo.png';

  camaraX = 0; camaraY = 0;
  spriteX = 0; spriteY = 0;
  transicionActiva = false;

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
    this.actualizarPosicion();
  }

  @HostListener('window:keydown', ['$event'])
  moverse(event: KeyboardEvent) {
    if (this.transicionActiva) return;

    let proximoX = this.pX;
    let proximoY = this.pY;
    let dir = 'abajo';

    switch (event.key.toLowerCase()) {
      case 'w': case 'arrowup':    proximoY -= this.paso; dir = 'arriba'; break;
      case 's': case 'arrowdown':  proximoY += this.paso; dir = 'abajo';  break;
      case 'a': case 'arrowleft':  proximoX -= this.paso; dir = 'izq';    break;
      case 'd': case 'arrowright': proximoX += this.paso; dir = 'der';    break;
      default: return;
    }

    if (proximoX < 0 || proximoX >= this.anchoMapa || proximoY < 0 || proximoY >= this.altoMapa) return;

    const colDestino = Math.floor(proximoX / this.paso);
    const filaDestino = Math.floor(proximoY / this.paso);

    const celdaDestino = (this.colisiones[filaDestino] && this.colisiones[filaDestino][colDestino] !== undefined)
      ? this.colisiones[filaDestino][colDestino]
      : 1;

    if (celdaDestino === 1) {
      console.log("¡BOOM! Pared detectada en:", filaDestino, colDestino);
      return;
    }

    if (celdaDestino === 3) {
      this.iniciarTransicionMapa();
      return;
    }

    this.pX = proximoX;
    this.pY = proximoY;
    this.spriteActual = `assets/sprites/chico-${dir}.png`;
    this.actualizarPosicion();
  }

  iniciarTransicionMapa() {
    if (this.transicionActiva) return;

    console.log("🚪 ¡Puerta detectada! Iniciando transición...");
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
}
