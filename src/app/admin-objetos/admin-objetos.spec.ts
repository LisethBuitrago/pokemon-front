import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminObjetos } from './admin-objetos';

describe('AdminObjetos', () => {
  let component: AdminObjetos;
  let fixture: ComponentFixture<AdminObjetos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminObjetos],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminObjetos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
