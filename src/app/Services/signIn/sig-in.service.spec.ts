import { TestBed } from '@angular/core/testing';

import { SigInService } from './sig-in.service';

describe('SigInService', () => {
  let service: SigInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
