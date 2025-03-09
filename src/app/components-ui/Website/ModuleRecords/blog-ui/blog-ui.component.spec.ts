import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogUIComponent } from './blog-ui.component';

describe('BlogUIComponent', () => {
  let component: BlogUIComponent;
  let fixture: ComponentFixture<BlogUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
