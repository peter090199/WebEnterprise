import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubMenuComponent } from './add-sub-menu.component';

describe('AddSubMenuComponent', () => {
  let component: AddSubMenuComponent;
  let fixture: ComponentFixture<AddSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
