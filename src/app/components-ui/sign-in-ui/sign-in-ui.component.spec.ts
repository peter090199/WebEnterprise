import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInUIComponent } from './sign-in-ui.component';

describe('SignInUIComponent', () => {
  let component: SignInUIComponent;
  let fixture: ComponentFixture<SignInUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
