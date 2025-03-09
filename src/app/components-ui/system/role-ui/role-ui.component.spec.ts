import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUIComponent } from './role-ui.component';

describe('RoleUIComponent', () => {
  let component: RoleUIComponent;
  let fixture: ComponentFixture<RoleUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
