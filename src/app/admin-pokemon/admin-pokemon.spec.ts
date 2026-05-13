import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPokemon } from './admin-pokemon';

describe('AdminPokemon', () => {
  let component: AdminPokemon;
  let fixture: ComponentFixture<AdminPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPokemon],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
