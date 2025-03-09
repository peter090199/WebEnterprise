import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRolesComponent } from './security-roles.component';

describe('SecurityRolesComponent', () => {
  let component: SecurityRolesComponent;
  let fixture: ComponentFixture<SecurityRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
