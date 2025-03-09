import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosImageUIComponent } from './promos-image-ui.component';

describe('PromosImageUIComponent', () => {
  let component: PromosImageUIComponent;
  let fixture: ComponentFixture<PromosImageUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromosImageUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromosImageUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
