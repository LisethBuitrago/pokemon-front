import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorOakPresentacion } from './profesor-oak-presentacion';

describe('ProfesorOakPresentacion', () => {
  let component: ProfesorOakPresentacion;
  let fixture: ComponentFixture<ProfesorOakPresentacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesorOakPresentacion],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorOakPresentacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
