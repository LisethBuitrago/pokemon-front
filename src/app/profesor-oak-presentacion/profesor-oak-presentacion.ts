// 1. Importamos OnDestroy
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-oak-presentacion',
  standalone: false,
  templateUrl: './profesor-oak-presentacion.html',
  styleUrl: './profesor-oak-presentacion.css',
})
export class ProfesorOakPresentacion implements OnInit, OnDestroy { // Agregamos OnDestroy aquí
  profesor = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/Professor_Oak7-removebg-preview_mnwi8o";
  enemigo="https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/what-the-heck-is-on-garys-hand-v0-wl8in652c23f1-removebg-preview_hug9aa";
  mensajeActual = 1;
  personajeVisible = 'oak';
  musicaOak = new Audio();

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.musicaOak.src = 'Welcome.mp3';
    this.musicaOak.loop = true;
    this.musicaOak.load();
    this.musicaOak.volume = 0.5;
    this.musicaOak.play().catch(error => console.log( error));

    setTimeout(() => { this.mensajeActual = 2; this.cd.detectChanges(); }, 5000);
    setTimeout(() => { this.mensajeActual = 3; this.cd.detectChanges(); }, 10000);
    setTimeout(() => { this.mensajeActual = 4; this.cd.detectChanges(); }, 15000);
    setTimeout(() => { this.mensajeActual = 5; this.cd.detectChanges(); }, 20000);
    setTimeout(() => { this.mensajeActual = 6; this.cd.detectChanges(); }, 25000);
    setTimeout(() => {
      this.personajeVisible = 'enemigo';
      this.mensajeActual = 6;
      this.cd.detectChanges();
    }, 30000);
    setTimeout(() => { this.mensajeActual = 7; this.cd.detectChanges(); }, 30000);
    setTimeout(() => { this.mensajeActual = 8; this.cd.detectChanges(); }, 35000);
    setTimeout(() => {
      this.router.navigate(['/mapa-principal']);
    }, 40000);
  }
  ngOnDestroy() {
    if (this.musicaOak) {
      this.musicaOak.pause();
      this.musicaOak.currentTime = 0;
    }
  }
}
