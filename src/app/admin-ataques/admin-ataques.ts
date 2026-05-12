import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-ataques',
  standalone: false,
  templateUrl: './admin-ataques.html',
  styleUrl: './admin-ataques.css'
})
export class AdminAtaques {
  private router = inject(Router);

  textoBusqueda: string = '';
  ataqueSeleccionado: string = 'A-002'; // Lanzallamas por defecto

  // Datos de prueba para la tabla de movimientos
  listaAtaques = [
    { id: 'A-001', nombre: 'PLACAJE', tipo: 'NORMAL', stats: '40p/100%/35pp' },
    { id: 'A-002', nombre: 'LANZALLAMAS', tipo: 'FUEGO', stats: '90p/100%/15pp' },
    { id: 'A-003', nombre: 'HIDROBOMBA', tipo: 'AGUA', stats: '110p/80%/5pp' },
    { id: 'A-004', nombre: 'HOJA AGUDA', tipo: 'PLANTA', stats: '90p/100%/15pp' },
    { id: 'A-005', nombre: 'RAYO', tipo: 'ELÉCTRICO', stats: '90p/100%/15pp' },
    { id: 'A-006', nombre: 'PSIQUICO', tipo: 'PSÍQUICO', stats: '90p/100%/10pp' },
    { id: 'A-007', nombre: 'RAYO HIELO', tipo: 'HIELO', stats: '90p/100%/10pp' },
  ];

  get listaFiltrada() {
    return this.listaAtaques.filter(a =>
      a.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
      a.id.includes(this.textoBusqueda)
    );
  }

  seleccionarAtaque(id: string) {
    this.ataqueSeleccionado = id;
  }

  // NAVEGACIÓN UNIFICADA
  irAPokemon() { this.router.navigate(['/admin-pokemon']); }
  irAAtaques() { this.router.navigate(['/admin-ataques']); }
  irAObjetos() { this.router.navigate(['/admin-objetos']); }
  irAEntrenadores() { this.router.navigate(['/admin-entrenadores']); }

  cerrarSesion() {
    this.router.navigate(['/login-administrador']);
  }
}
