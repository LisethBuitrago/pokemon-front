import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-entrenadores',
  standalone: false, // <-- IMPORTANTE
  templateUrl: './admin-entrenadores.html',
  styleUrl: './admin-entrenadores.css',
  // ELIMINAMOS la línea de imports de aquí
})
export class AdminEntrenadores {
  private router = inject(Router);

  textoBusqueda: string = '';
  entrenadorSeleccionado: string = 'E-004'; // Misty por defecto

  listaEntrenadores = [
    { id: 'E-001', nombre: 'ROJO', rango: 'PROTAGONISTA', region: 'KANTO' },
    { id: '002', nombre: 'AZUL', rango: 'RIVAL', region: 'KANTO' },
    { id: 'E-003', nombre: 'BROCK', rango: 'LÍDER GIMNASIO', region: 'ROCA' },
    { id: 'E-004', nombre: 'MISTY', rango: 'LÍDER GIMNASIO', region: 'AGUA' },
    { id: 'E-005', nombre: 'TTE. SURGE', rango: 'LÍDER GIMNASIO', region: 'ELÉCTRICO' },
    { id: 'E-006', nombre: 'ERIKA', rango: 'LÍDER GIMNASIO', region: 'PLANTA' },
    { id: 'E-007', nombre: 'SABRINA', rango: 'LÍDER GIMNASIO', region: 'PSÍQUICO' },
    { id: 'E-008', nombre: 'GIOVANNI', rango: 'LÍDER TEAM ROCKET', region: 'TIERRA' },
  ];

  get listaFiltrada() {
    return this.listaEntrenadores.filter(
      (e) =>
        e.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        e.id.includes(this.textoBusqueda),
    );
  }

  seleccionarEntrenador(id: string) {
    this.entrenadorSeleccionado = id;
  }

  irAPokemon() { this.router.navigate(['/admin-pokemon']); }
  irAAtaques() { this.router.navigate(['/admin-ataques']); }
  irAObjetos() { this.router.navigate(['/admin-objetos']); }
  irAEntrenadores() { this.router.navigate(['/admin-entrenadores']); }

  cerrarSesion() { this.router.navigate(['/login-administrador']); }

  aceptar() {
    alert(`Gestionando perfil de: ${this.entrenadorSeleccionado}`);
  }
}
