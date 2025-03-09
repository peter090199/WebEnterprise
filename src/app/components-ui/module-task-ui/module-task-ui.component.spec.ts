import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTaskUIComponent } from './module-task-ui.component';

describe('ModuleTaskUIComponent', () => {
  let component: ModuleTaskUIComponent;
  let fixture: ComponentFixture<ModuleTaskUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTaskUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTaskUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
