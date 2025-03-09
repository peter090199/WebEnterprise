import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuUIComponent } from './sub-menu-ui.component';

describe('SubMenuUIComponent', () => {
  let component: SubMenuUIComponent;
  let fixture: ComponentFixture<SubMenuUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMenuUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
