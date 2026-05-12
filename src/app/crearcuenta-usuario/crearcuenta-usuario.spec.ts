import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcuentaUsuario } from './crearcuenta-usuario';

describe('CrearcuentaUsuario', () => {
  let component: CrearcuentaUsuario;
  let fixture: ComponentFixture<CrearcuentaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearcuentaUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearcuentaUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
