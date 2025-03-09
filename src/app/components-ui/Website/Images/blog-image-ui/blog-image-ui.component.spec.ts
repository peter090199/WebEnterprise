import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogImageUIComponent } from './blog-image-ui.component';

describe('BlogImageUIComponent', () => {
  let component: BlogImageUIComponent;
  let fixture: ComponentFixture<BlogImageUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogImageUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogImageUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
