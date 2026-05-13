import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntrenadores } from './admin-entrenadores';

describe('AdminEntrenadores', () => {
  let component: AdminEntrenadores;
  let fixture: ComponentFixture<AdminEntrenadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEntrenadores],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEntrenadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
