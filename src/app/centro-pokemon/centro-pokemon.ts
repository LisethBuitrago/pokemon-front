import { Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CentroPokemonService } from '../services/centro-pokemon.service';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'app-centro-pokemon',
  standalone: false,
  templateUrl: './centro-pokemon.html',
  styleUrl: './centro-pokemon.css'
})
export class CentroPokemon implements OnInit, OnDestroy {
  private router = inject(Router);
  private centroPokemonService = inject(CentroPokemonService);
  private juegoService = inject(JuegoService);
  imgCentroPokemon = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/Gemini_Generated_Image_8tyibp8tyibp8tyi_2_xp6axy";
  spritePersonajeMujer = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/green_manga_by_miused_dfz6h8l_ntt5ih";
  spritePersonajeHombre = "https://res.cloudinary.com/dqmacbgi6/image/upload/f_auto,q_auto/overworld_sprite_template_for_pokemon_games_by_cynthiacelestic_d8h0v36_cpg5j4";
  spriteActual = '';
  posicionFondo = '0px 0px';
  transicionActiva = false;

  musicaCentro = new Audio('centropokemon.mp3');

  dialogoVisible = false;
  mostrarOpciones = false;
  mensajeActual = 0;
  opcionSeleccionadaIndex = 0;

  textosEnfermera = [
    "Este es el Centro Pokémon.",
    "Aquí se cura a los Pokémon debilitados.",
    "¿Quieres que nos ocupemos de los Pokémon de tu equipo?",
    ""
  ];

  listaOpciones = [
    { id: 'si', texto: 'SÍ' },
    { id: 'no', texto: 'NO' }
  ];

  anchoMapa: number = 500;
  altoMapa: number = 400;
  anchoVista: number = 500;
  altoVista: number = 400;

  pX: number = 250;
  pY: number = 200;

  camaraX: number = 0;
  camaraY: number = 0;
  spriteX: number = 0;
  spriteY: number = 0;

  anchoFrame: number = 32;
  altoFrame: number = 48;
  frameX: number = 0;
  frameY: number = 0;

  obstaculos = [
    { x: -50, y: 0, ancho: 80, alto: 400 },
    { x: 400, y: 0, ancho: 80, alto: 400 },
    { x: 0, y: -50, ancho: 500, alto: 155 },
    { x: 0, y: 380, ancho: 190, alto: 50 },
    { x: 250, y: 380, ancho: 250, alto: 50 },
    { x: 130, y: 105, ancho: 90, alto: 80 },
    { x: 220, y: 105, ancho: 80, alto: 30 },
    { x: 300, y: 105, ancho: 70, alto: 80 },
    { x: 65, y: 220, ancho: 70, alto: 40 },
    { x: 65, y: 260, ancho: 70, alto: 80 },
    { x: 365, y: 220, ancho: 70, alto: 40 },
    { x: 365, y: 260, ancho: 70, alto: 80 }
  ];

  zonaSalida = { x: 190, y: 360, ancho: 60, alto: 40 };
  zonaEnfermera = { x: 220, y: 135, ancho: 80, alto: 40 };
  zonaPC = { x: 370, y: 105, ancho: 30, alto: 30 };

  intervaloMovimiento: any;
  direccionActual: string = '';

  ngOnInit() {
    if (this.juegoService.generoSeleccionado === 'mujer') {
      this.spriteActual = this.spritePersonajeMujer;
    } else {
      this.spriteActual = this.spritePersonajeHombre;
    }

    this.actualizarPosicion();
    this.actualizarSprite();

    this.musicaCentro.loop = true;
    this.musicaCentro.volume = 0.25;
    this.musicaCentro.play().catch(() => console.log('Audio en espera de interacción.'));
  }

  ngOnDestroy() {
    this.detenerMovimiento();
    this.musicaCentro.pause();
    this.musicaCentro.currentTime = 0;
  }

  @HostListener('window:keydown', ['$event'])
  manejarTeclado(event: KeyboardEvent) {
    const tecla = event.key.toLowerCase();

    if (this.dialogoVisible && this.mostrarOpciones) {
      if (tecla === 'w' || tecla === 's' || tecla === 'arrowup' || tecla === 'arrowdown') {
        this.opcionSeleccionadaIndex = this.opcionSeleccionadaIndex === 0 ? 1 : 0;
      }
      if (tecla === 'enter' || tecla === 'e') {
        const opcionId = this.listaOpciones[this.opcionSeleccionadaIndex].id;
        this.elegirOpcion(opcionId);
      }
      return;
    }

    if (this.dialogoVisible && !this.mostrarOpciones) {
      if (tecla === 'enter' || tecla === 'e' || tecla === ' ') {
        this.siguienteMensaje();
      }
      return;
    }

    if (this.transicionActiva) return;

    if (['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright'].includes(tecla)) {
      let dir = 's';
      if (tecla === 'w' || tecla === 'arrowup') dir = 'w';
      if (tecla === 'a' || tecla === 'arrowleft') dir = 'a';
      if (tecla === 's' || tecla === 'arrowdown') dir = 's';
      if (tecla === 'd' || tecla === 'arrowright') dir = 'd';

      this.iniciarMovimientoCelular(dir);
    }
  }

  @HostListener('window:keyup', ['$event'])
  soltarTecla(event: KeyboardEvent) {
    this.detenerMovimientoCelular();
  }

  iniciarMovimientoCelular(direccion: string) {
    if (this.direccionActual === direccion || this.transicionActiva || this.dialogoVisible) return;

    this.direccionActual = direccion;
    this.moverPersonaje(direccion);

    if (this.intervaloMovimiento) clearInterval(this.intervaloMovimiento);
    this.intervaloMovimiento = setInterval(() => {
      this.moverPersonaje(direccion);
    }, 50);
  }

  detenerMovimientoCelular() {
    this.detenerMovimiento();
  }

  detenerMovimiento() {
    this.direccionActual = '';
    if (this.intervaloMovimiento) {
      clearInterval(this.intervaloMovimiento);
      this.intervaloMovimiento = null;
    }
    this.frameX = 0;
    this.actualizarSprite();
  }

  moverPersonaje(direccion: string) {
    let futuroX = this.pX;
    let futuroY = this.pY;
    const velocidad = 6;

    if (direccion === 'w') { futuroY -= velocidad; this.frameY = 3; }
    if (direccion === 's') { futuroY += velocidad; this.frameY = 0; }
    if (direccion === 'a') { futuroX -= velocidad; this.frameY = 1; }
    if (direccion === 'd') { futuroX += velocidad; this.frameY = 2; }

    this.frameX = this.frameX === 0 ? 1 : (this.frameX === 1 ? 2 : 0);

    if (!this.hayColision(futuroX, futuroY)) {
      this.pX = futuroX;
      this.pY = futuroY;
    }

    this.actualizarPosicion();
    this.actualizarSprite();
  }

  hayColision(futuroX: number, futuroY: number): boolean {
    const pieX = futuroX + 6;
    const pieY = futuroY + 30;
    const pieAncho = 20;
    const pieAlto = 18;

    for (let obs of this.obstaculos) {
      if (
        pieX < obs.x + obs.ancho &&
        pieX + pieAncho > obs.x &&
        pieY < obs.y + obs.alto &&
        pieY + pieAlto > obs.y
      ) {
        return true;
      }
    }
    return false;
  }

  actualizarSprite() {
    const posX = -(this.frameX * this.anchoFrame);
    const posY = -(this.frameY * this.altoFrame);
    this.posicionFondo = `${posX}px ${posY}px`;
  }

  actualizarPosicion() {
    this.camaraX = Math.max(0, Math.min(this.pX - this.anchoVista / 2, this.anchoMapa - this.anchoVista));
    this.camaraY = Math.max(0, Math.min(this.pY - this.altoVista / 2, this.altoMapa - this.altoVista));

    this.spriteX = this.pX - this.camaraX;
    this.spriteY = this.pY - this.camaraY;

    this.verificarInteracciones();
  }

  verificarInteracciones() {
    if (this.estaPisando(this.pX, this.pY, this.zonaSalida)) {
      if (!this.transicionActiva) {
        this.transicionActiva = true;
        this.detenerMovimiento();
        setTimeout(() => {
          this.router.navigate(['/mapa-principal']);
        }, 800);
      }
    }
    else if (this.estaPisando(this.pX, this.pY, this.zonaEnfermera)) {
      if (!this.dialogoVisible) {
        this.dialogoVisible = true;
        this.mensajeActual = 0;
        this.mostrarOpciones = false;
        this.opcionSeleccionadaIndex = 0;
        this.detenerMovimiento();
      }
    }
    else if (this.estaPisando(this.pX, this.pY, this.zonaPC)) {
      this.detenerMovimiento();
      console.log("Sistema de PC encendido...");
    }
  }

  procesarBotonA() {
    if (this.dialogoVisible) {
      if (this.mostrarOpciones) {
        const opcionId = this.listaOpciones[this.opcionSeleccionadaIndex].id;
        this.elegirOpcion(opcionId);
      } else {
        this.siguienteMensaje();
      }
    }
  }

  siguienteMensaje() {
    if (this.mostrarOpciones) return;

    if (this.mensajeActual < 2) {
      this.mensajeActual++;
      if (this.mensajeActual === 2) {
        this.mostrarOpciones = true;
      }
    } else if (this.mensajeActual === 3) {
      this.cerrarDialogo();
    }
  }



  //TENER EN CUENTA

  elegirOpcion(opcion: string) {
    this.mostrarOpciones = false;
    this.mensajeActual = 3;

    if (opcion === 'si') {
      this.textosEnfermera[3] = "¡Entendido! Déjame tus Pokémon un segundo...";

      const sonidoCurar = new Audio('curarpokemon.mp3');
      sonidoCurar.play().catch(err => console.log("Sonido omitido por el navegador"));

      const equipoGuardado = localStorage.getItem('equipoParaCurar');
      const equipoPokemonIds: number[] = equipoGuardado ? JSON.parse(equipoGuardado) : [1, 2];

      equipoPokemonIds.forEach((id: number) => {
        this.centroPokemonService.curarPokemon(id).subscribe({
          next: (respuesta) => console.log(` Backend dice: Pokémon ${id} curado -`, respuesta.body),
          error: (error) => console.error(` Error curando Pokémon ${id}`, error)
        });
      });

      setTimeout(() => {
        localStorage.setItem('equipoCuradoBackend', 'true');
        this.textosEnfermera[3] = "¡Listo! Tu equipo está completamente recuperado. ¡Vuelve cuando quieras!";
      }, 2500);

    } else {
      this.textosEnfermera[3] = "Esperamos verte de nuevo si tus Pokémon se cansan.";
    }
  }

  cerrarDialogo() {
    this.dialogoVisible = false;
    this.pY += 15;
    this.actualizarPosicion();
  }

  estaPisando(x: number, y: number, zona: any): boolean {
    const pieX = x + 6;
    const pieY = y + 30;
    const pieAncho = 20;
    const pieAlto = 18;

    return (
      pieX < zona.x + zona.ancho &&
      pieX + pieAncho > zona.x &&
      pieY < zona.y + zona.alto &&
      pieY + pieAlto > zona.y
    );
  }
}
