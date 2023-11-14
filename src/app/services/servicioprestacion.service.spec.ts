import { TestBed } from '@angular/core/testing';

import { ServicioprestacionService } from './servicioprestacion.service';

describe('ServicioprestacionService', () => {
  let service: ServicioprestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioprestacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
