import { TestBed } from '@angular/core/testing';

import { ActivacionesService } from './activaciones.service';

describe('ActivacionesService', () => {
  let service: ActivacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
