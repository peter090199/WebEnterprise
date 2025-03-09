import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusUIComponent } from './contactus-ui.component';

describe('ContactusUIComponent', () => {
  let component: ContactusUIComponent;
  let fixture: ComponentFixture<ContactusUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
