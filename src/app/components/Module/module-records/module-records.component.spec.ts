import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRecordsComponent } from './module-records.component';

describe('ModuleRecordsComponent', () => {
  let component: ModuleRecordsComponent;
  let fixture: ComponentFixture<ModuleRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
