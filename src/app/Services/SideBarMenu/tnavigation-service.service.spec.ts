import { TestBed } from '@angular/core/testing';

import { TNavigationServiceService } from './tnavigation-service.service';

describe('TNavigationServiceService', () => {
  let service: TNavigationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TNavigationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
