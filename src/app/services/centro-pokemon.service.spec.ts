import { TestBed } from '@angular/core/testing';

import { CentroPokemonService } from './centro-pokemon.service';

describe('CentroPokemonService', () => {
  let service: CentroPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
