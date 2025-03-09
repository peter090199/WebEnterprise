import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromosUIComponent } from './promos-ui.component';

describe('PromosUIComponent', () => {
  let component: PromosUIComponent;
  let fixture: ComponentFixture<PromosUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromosUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromosUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
