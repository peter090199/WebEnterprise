import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUIComponent } from './menu-ui.component';

describe('MenuUIComponent', () => {
  let component: MenuUIComponent;
  let fixture: ComponentFixture<MenuUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
