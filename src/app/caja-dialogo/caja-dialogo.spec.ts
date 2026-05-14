import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaDialogo } from './caja-dialogo';

describe('CajaDialogo', () => {
  let component: CajaDialogo;
  let fixture: ComponentFixture<CajaDialogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CajaDialogo],
    }).compileComponents();

    fixture = TestBed.createComponent(CajaDialogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
