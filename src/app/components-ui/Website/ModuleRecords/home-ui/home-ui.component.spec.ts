import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUIComponent } from './home-ui.component';

describe('HomeUIComponent', () => {
  let component: HomeUIComponent;
  let fixture: ComponentFixture<HomeUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
