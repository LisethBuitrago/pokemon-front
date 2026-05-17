import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-profesor-oak-presentacion',
  standalone: false,
  templateUrl: './profesor-oak-presentacion.html',
  styleUrl: './profesor-oak-presentacion.css',
})
export class ProfesorOakPresentacion implements OnInit, OnDestroy {
  profesor = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/Professor_Oak7-removebg-preview_mnwi8o";
  enemigo="https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/what-the-heck-is-on-garys-hand-v0-wl8in652c23f1-removebg-preview_hug9aa";
  personajeHombre="https://i.redd.it/pok%C3%A9mon-master-red-pok%C3%A9mon-v0-riknikgp1rgd1.png?width=206&format=png&auto=webp&s=72aabfa02e8332cfc1c637e0267c8985c78db0df";
  personajeMujer="https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/4460162_orig-removebg-preview_wlntbp";

  mensajeActual = 1;
  personajeVisible = 'oak';
  musicaOak = new Audio();

  iniciandoTransicion = false;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private juegoService: JuegoService
  ) {}

  ngOnInit() {
    this.musicaOak.src = 'Welcome.mp3';
    this.musicaOak.loop = true;
    this.musicaOak.load();
    this.musicaOak.volume = 0.5;
    this.musicaOak.play().catch(error => console.log(error));
    setTimeout(() => { this.mensajeActual = 2; this.cd.detectChanges(); }, 5000);
    setTimeout(() => { this.mensajeActual = 3; this.cd.detectChanges(); }, 10000);
  }

  elegirPersonaje(genero: string) {
    this.juegoService.generoSeleccionado = genero;

    this.personajeVisible = genero;
    this.mensajeActual = 4;
    this.cd.detectChanges();

    setTimeout(() => {
      this.personajeVisible = 'oak';
      this.mensajeActual = 5;
      this.cd.detectChanges();
    }, 7500);

    setTimeout(() => { this.mensajeActual = 6; this.cd.detectChanges(); }, 13000);
    setTimeout(() => { this.mensajeActual = 7; this.cd.detectChanges(); }, 18000);

    setTimeout(() => {
      this.mensajeActual = 8;
      this.personajeVisible = 'enemigo';
      this.cd.detectChanges();
    }, 23000);

    setTimeout(() => {
      this.mensajeActual = 9;
      this.personajeVisible = genero;
      this.cd.detectChanges();
    }, 28000);

    setTimeout(() => {
      this.iniciandoTransicion = true;
      this.cd.detectChanges();
    }, 32000);

    setTimeout(() => {
      this.router.navigate(['/mapa-principal']);
    }, 33500);
  }

  ngOnDestroy() {
    if (this.musicaOak) {
      this.musicaOak.pause();
    }
  }
}
