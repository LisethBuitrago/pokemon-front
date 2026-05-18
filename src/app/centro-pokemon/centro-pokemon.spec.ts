import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroPokemon } from './centro-pokemon';

describe('CentroPokemon', () => {
  let component: CentroPokemon;
  let fixture: ComponentFixture<CentroPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentroPokemon],
    }).compileComponents();

    fixture = TestBed.createComponent(CentroPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
