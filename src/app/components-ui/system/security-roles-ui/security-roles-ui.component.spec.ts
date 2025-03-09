import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRolesUIComponent } from './security-roles-ui.component';

describe('SecurityRolesUIComponent', () => {
  let component: SecurityRolesUIComponent;
  let fixture: ComponentFixture<SecurityRolesUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRolesUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityRolesUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
