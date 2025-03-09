import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRecordsComponent } from './blog-records.component';

describe('BlogRecordsComponent', () => {
  let component: BlogRecordsComponent;
  let fixture: ComponentFixture<BlogRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
