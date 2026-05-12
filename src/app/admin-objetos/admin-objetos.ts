import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-objetos',
  standalone: false,
  templateUrl: './admin-objetos.html',
  styleUrl: './admin-objetos.css'
})
export class AdminObjetos {
  private router = inject(Router);

  textoBusqueda: string = '';
  objetoSeleccionado: string = 'I-004'; // Master Ball por defecto

  // Datos de prueba para el inventario
  listaObjetos = [
    { id: 'I-001', nombre: 'POKÉ BALL', categorias: ['ESFÉRICO', 'CAPTURA'] },
    { id: 'I-002', nombre: 'SUPER BALL', categorias: ['ESFÉRICO', 'CAPTURA'] },
    { id: 'I-003', nombre: 'ULTRA BALL', categorias: ['ESFÉRICO', 'CAPTURA'] },
    { id: 'I-004', nombre: 'MASTER BALL', categorias: ['ESFÉRICO', 'CAPTURA'] },
    { id: 'I-005', nombre: 'POCIÓN', categorias: ['CURACIÓN', 'SALUD'] },
    { id: 'I-006', nombre: 'SUPERPOCIÓN', categorias: ['CURACIÓN', 'SALUD'] },
    { id: 'I-007', nombre: 'REVIVIR', categorias: ['CURACIÓN', 'ESTADO'] },
    { id: 'I-008', nombre: 'PIEDRA FUEGO', categorias: ['EVOLUTIVO', 'FUEGO'] },
  ];

  // Buscador dinámico
  get listaFiltrada() {
    return this.listaObjetos.filter(obj =>
      obj.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
      obj.id.includes(this.textoBusqueda)
    );
  }

  seleccionarObjeto(id: string) {
    this.objetoSeleccionado = id;
  }

  // Navegación
  irAPokemon() { this.router.navigate(['/admin-pokemon']); }
  irAAtaques() { this.router.navigate(['/admin-ataques']); }
  irAObjetos() { this.router.navigate(['/admin-objetos']); }
  irAEntrenadores() { this.router.navigate(['/admin-entrenadores']); }

  cerrarSesion() {
    this.router.navigate(['/login-administrador']);
  }

  aceptar() {
    alert(`Gestionando objeto: ${this.objetoSeleccionado}`);
  }
}
