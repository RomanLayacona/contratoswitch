import { TestBed } from '@angular/core/testing';

import { DescuentosntService } from './descuentosnt.service';

describe('DescuentosntService', () => {
  let service: DescuentosntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescuentosntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
