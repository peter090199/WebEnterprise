import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUIComponent } from './about-ui.component';

describe('AboutUIComponent', () => {
  let component: AboutUIComponent;
  let fixture: ComponentFixture<AboutUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
