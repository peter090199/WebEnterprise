import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleUIComponent } from './module-ui.component';

describe('ModuleUIComponent', () => {
  let component: ModuleUIComponent;
  let fixture: ComponentFixture<ModuleUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
