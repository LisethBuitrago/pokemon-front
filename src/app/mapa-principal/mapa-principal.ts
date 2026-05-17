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
  anchoMapa = 1024; altoMapa = 768;
  anchoVista = 800; altoVista = 600;

  pX = 608; pY = 192;
  camaraX = 0; camaraY = 0;
  spriteX = 0; spriteY = 0;
  transicionActiva = false;
  estaMoviendose = false;
  velocidadPaso = 100;

  anchoFrame = 32; altoFrame = 48;
  frameX = 0; frameY = 0;
  posicionFondo = '0px 0px';

  musicaMapa = new Audio();
  private intervaloCelular: any = null;

  menuStartAbierto: boolean = false;
  pantallaPokemonAbierta: boolean = false;

  opcionesMenu: string[] = ['POKÉDEX', 'POKÉMON', 'MOCHILA', 'PC DE BILL', 'ENTRENADOR', 'SALIR'];
  menuSeleccionado: number = 0;
  pokemonSeleccionado: number = 0;
  equipoPokemon: any[] = [];

  menuPcAbierto: boolean = false;
  cajaActiva: number = 1;
  caja1: any[] = [];
  caja2: any[] = [];
  cursorColumna: number = 0;
  cursorFila: number = 0;

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
    this.musicaMapa.play().catch(error => console.log("Esperando interacción:", error));

    this.equipoPokemon = [
      { pokeApiId: 25, nombre: 'Pikachu', nivel: 15, hpMax: 40, hpActual: 40, genero: 'M' },
      { pokeApiId: 1, nombre: 'Bulbasaur', nivel: 12, hpMax: 35, hpActual: 20, genero: 'M' }
    ];

    this.caja1[0] = { pokeApiId: 4, nombre: 'Charmander', nivel: 5 };
    this.caja1[5] = { pokeApiId: 7, nombre: 'Squirtle', nivel: 6 };
    this.caja2[12] = { pokeApiId: 150, nombre: 'Mewtwo', nivel: 70 };
  }

  @HostListener('window:keydown', ['$event'])
  moverse(event: KeyboardEvent) {
    const tecla = event.key.toLowerCase();

    if (tecla === 'escape' || tecla === 'm') {
      this.toggleMenuStart();
      return;
    }
    this.procesarDireccion(tecla);
  }

  procesarDireccion(tecla: string) {
    if (this.transicionActiva || this.estaMoviendose) return;

    if (this.menuPcAbierto) {
      this.navegarPc(tecla);
      return;
    } else if (this.pantallaPokemonAbierta) {
      this.navegarPantallaPokemon(tecla);
      return;
    } else if (this.menuStartAbierto) {
      this.navegarMenuStart(tecla);
      return;
    }

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
      ? this.colisiones[filaDestino][colDestino] : 1;

    if (celdaDestino === 1) {
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

    if (seMovio) this.frameX = (this.frameX + 1) % 4;

    this.actualizarSprite();
    this.actualizarPosicion();

    setTimeout(() => { this.estaMoviendose = false; }, this.velocidadPaso);
  }

  navegarMenuStart(tecla: string) {
    if (tecla === 'arrowup' || tecla === 'w') {
      this.menuSeleccionado = this.menuSeleccionado > 0 ? this.menuSeleccionado - 1 : this.opcionesMenu.length - 1;
    }
    if (tecla === 'arrowdown' || tecla === 's') {
      this.menuSeleccionado = this.menuSeleccionado < this.opcionesMenu.length - 1 ? this.menuSeleccionado + 1 : 0;
    }
    if (tecla === 'enter' || tecla === 'a' || tecla === 'action') {
      this.ejecutarOpcionMenu();
    }
  }

  navegarPantallaPokemon(tecla: string) {
    if (tecla === 'arrowup' || tecla === 'w') {
      if (this.pokemonSeleccionado > 0) this.pokemonSeleccionado--;
    }
    if (tecla === 'arrowdown' || tecla === 's') {
      if (this.pokemonSeleccionado < 5) this.pokemonSeleccionado++;
    }
    if (tecla === 'enter' || tecla === 'a' || tecla === 'action') {
      console.log(`Seleccionaste a: ${this.equipoPokemon[this.pokemonSeleccionado]?.nombre}`);
    }
    if (tecla === 'backspace' || tecla === 'b') {
      this.pantallaPokemonAbierta = false;
      this.menuStartAbierto = true; // Botón B regresa
    }
  }

  navegarPc(tecla: string) {
    if (tecla === 'arrowup' || tecla === 'w') { if (this.cursorFila > 0) this.cursorFila--; }
    if (tecla === 'arrowdown' || tecla === 's') { if (this.cursorFila < 4) this.cursorFila++; }
    if (tecla === 'arrowleft' || tecla === 'a') { if (this.cursorColumna > 0) this.cursorColumna--; }
    if (tecla === 'arrowright' || tecla === 'd') { if (this.cursorColumna < 5) this.cursorColumna++; }

    if (tecla === 'enter' || tecla === 'action') {
      const listaActual = this.cajaActiva === 1 ? this.caja1 : this.caja2;
      const pokemon = listaActual[this.indexSeleccionado];
      console.log(pokemon ? `Seleccionado en PC: ${pokemon.nombre}` : 'Espacio vacío');
    }
    if (tecla === 'backspace' || tecla === 'b') {
      this.menuPcAbierto = false;
      this.menuStartAbierto = true;
    }
  }

  get indexSeleccionado(): number {
    return (this.cursorFila * 6) + this.cursorColumna;
  }

  cambiarCaja(num: number) {
    this.cajaActiva = num;
  }

  ejecutarOpcionMenu() {
    const opcion = this.opcionesMenu[this.menuSeleccionado];
    if (opcion === 'POKÉMON') {
      this.menuStartAbierto = false;
      this.pantallaPokemonAbierta = true;
    } else if (opcion === 'PC DE BILL') {
      this.menuStartAbierto = false;
      this.menuPcAbierto = true;
    } else if (opcion === 'SALIR') {
      this.menuStartAbierto = false;
    }
  }

  toggleMenuStart() {
    if (this.pantallaPokemonAbierta || this.menuPcAbierto) {
      this.pantallaPokemonAbierta = false;
      this.menuPcAbierto = false;
      this.menuStartAbierto = true;
    } else {
      this.menuStartAbierto = !this.menuStartAbierto;
    }
  }

  togglePcBill() {
    this.menuPcAbierto = false;
    this.menuStartAbierto = true;
  }

  obtenerSpriteMini(pokeApiId: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokeApiId}.png`;
  }

  iniciarMovimientoCelular(tecla: string) {
    this.detenerMovimientoCelular();
    this.procesarDireccion(tecla);
    this.intervaloCelular = setInterval(() => { this.procesarDireccion(tecla); }, this.velocidadPaso);
  }

  detenerMovimientoCelular() {
    if (this.intervaloCelular) { clearInterval(this.intervaloCelular); this.intervaloCelular = null; }
  }

  actualizarSprite() {
    const posX = -(this.frameX * this.anchoFrame);
    const posY = -(this.frameY * this.altoFrame);
    this.posicionFondo = `${posX}px ${posY}px`;
  }

  iniciarTransicionMapa() {
    if (this.transicionActiva) return;
    this.transicionActiva = true;
    setTimeout(() => {
      if (this.pY < 100) { this.pX = 544; this.pY = 600; }
      else { this.pY += this.paso; }
      this.actualizarPosicion();
      setTimeout(() => { this.transicionActiva = false; }, 500);
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
    if (this.musicaMapa) this.musicaMapa.pause();
  }
}
