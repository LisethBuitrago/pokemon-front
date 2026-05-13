import { TestBed } from '@angular/core/testing';

import { CombateService } from './combate.service';

describe('CombateService', () => {
  let service: CombateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
