import { TestBed } from '@angular/core/testing';

import { SecurityRolesService } from './security-roles.service';

describe('SecurityRolesService', () => {
  let service: SecurityRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
