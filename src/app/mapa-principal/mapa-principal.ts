import { Component, HostListener, OnInit } from '@angular/core';

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
  anchoVista = 512;
  altoVista = 448;

  pX = 128;
  pY = 128;

  camaraX = 0;
  camaraY = 0;
  spriteX = 0;
  spriteY = 0;

  genero = 'chico';
  spriteActual = '';

  colisiones: number[][] = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1],
  ];

  ngOnInit() {
    this.actualizarPosicion();
    this.actualizarSprite('abajo');
  }

  @HostListener('window:keydown', ['$event'])
  moverse(event: KeyboardEvent) {
    let proximoX = this.pX;
    let proximoY = this.pY;

    switch (event.key.toLowerCase()) {
      case 'w': case 'arrowup':    proximoY -= this.paso; this.actualizarSprite('arriba'); break;
      case 's': case 'arrowdown':  proximoY += this.paso; this.actualizarSprite('abajo'); break;
      case 'a': case 'arrowleft':  proximoX -= this.paso; this.actualizarSprite('izq'); break;
      case 'd': case 'arrowright': proximoX += this.paso; this.actualizarSprite('der'); break;
      default: return;
    }

    if (proximoX < 0 || proximoX >= this.anchoMapa || proximoY < 0 || proximoY >= this.altoMapa) return;

    this.pX = proximoX;
    this.pY = proximoY;
    this.actualizarPosicion();
  }

  actualizarPosicion() {
    this.camaraX = Math.max(0, Math.min(this.anchoMapa - this.anchoVista, this.pX - this.anchoVista / 2));
    this.camaraY = Math.max(0, Math.min(this.altoMapa - this.altoVista, this.pY - this.altoVista / 2));

    this.spriteX = this.pX - this.camaraX;
    this.spriteY = this.pY - this.camaraY;
  }

  actualizarSprite(dir: string) {
    this.spriteActual = `assets/sprites/${this.genero}-${dir}.png`;
  }
}
