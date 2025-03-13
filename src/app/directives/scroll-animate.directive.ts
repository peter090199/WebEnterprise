import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]'
})
export class ScrollAnimateDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.applyAnimations();
  }

  private applyAnimations(): void {
    const elements = this.el.nativeElement.querySelectorAll('.text-description, .scroll-item');
    elements.forEach((element: HTMLElement) => {
      const position = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (position < windowHeight * 0.8) {
        element.classList.add('fade-in');
      }
    });
  }
}
