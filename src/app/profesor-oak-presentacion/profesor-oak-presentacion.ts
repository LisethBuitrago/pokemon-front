import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-oak-presentacion',
  standalone: false,
  templateUrl: './profesor-oak-presentacion.html',
  styleUrl: './profesor-oak-presentacion.css',
})
export class ProfesorOakPresentacion implements OnInit, OnDestroy {
  profesor = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/Professor_Oak7-removebg-preview_mnwi8o";
  enemigo="https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/what-the-heck-is-on-garys-hand-v0-wl8in652c23f1-removebg-preview_hug9aa";
  personajeHombre="https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/833574-removebg-preview_ide0iy"
  personajeMujer="https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/4460162_orig-removebg-preview_wlntbp"

  mensajeActual = 1;
  personajeVisible = 'oak';
  musicaOak = new Audio();

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

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
    this.personajeVisible = genero;
    this.mensajeActual = 4;
    this.cd.detectChanges();
    setTimeout(() => {
      this.personajeVisible = 'oak';
      this.mensajeActual = 5;
      this.cd.detectChanges();
    }, 8000);

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
    }, 27000);
  }

  ngOnDestroy() {
    if (this.musicaOak) {
      this.musicaOak.pause();
    }
  }
}
