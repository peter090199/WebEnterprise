import { ElementRef } from '@angular/core';
import { ScrollAnimateDirective } from './scroll-animate.directive';

describe('ScrollAnimateDirective', () => {
  let mockElementRef: ElementRef;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('div'));
  });

  it('should create an instance', () => {
    const directive = new ScrollAnimateDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
