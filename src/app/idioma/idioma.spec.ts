import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Idioma } from './idioma';

describe('Idioma', () => {
  let component: Idioma;
  let fixture: ComponentFixture<Idioma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Idioma],
    }).compileComponents();

    fixture = TestBed.createComponent(Idioma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
