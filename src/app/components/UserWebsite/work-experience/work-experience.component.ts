import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { slideUpDownAnimation,slideLeftRightAnimation,slideUp, slideFade } from 'src/app/animation';
@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
  animations:[slideUpDownAnimation,slideLeftRightAnimation,slideUp, slideFade]
})
export class WorkExperienceComponent implements OnInit {
  experiences = [
    {
      title: 'IT Industry ',
      role: 'Software Engineer',
      company: 'Mariosoft Solutions',
      duration: '2022-Present',
      details: [
        'Designed intuitive and visually appealing user interfaces for various client projects, ensuring consistency and usability across platforms.',
        'Experience 2 years Angular TypeScript and Laravel for maintaining the company system in Mariosoft Solutions.',
        'Customized design of the Payroll system using C# desktop products to the requested business process for client needs.',
        'Enhanced, adjusted, and maintained products for every customization and update.',
        'Enhanced maintainable code for every product system, with capability in web development using TypeScript and Laravel REST API.',
        'Experience with version control tools like Git.'
      ]
    },
    {
      title: 'FREELANCER',
      role: 'Web Developer',
      company: 'N/A',
      duration: '2024-Present',
      details: [
        'I am a dedicated freelancer specializing in customizing websites and web applications to meet unique client needs.',
        'With expertise in Angular, TypeScript, Laravel, and POSTMAN API development tesing, I build scalable, user-friendly, and high-performance digital solutions.',
        'My experience includes designing intuitive user interfaces, optimizing system performance, and integrating customized features for businesses.',
        'I am committed to delivering high-quality, maintainable code and ensuring seamless user experiences across platforms.',
      ]
    }
  ];

  constructor( private el: ElementRef) { }

  ngOnInit(): void {
    this.onScroll();
  }

  /** Detect when user scrolls to bottom to load more images */
    @HostListener('window:scroll', [])
    onScroll(): void {
      this.applyAnimations();
    }
  
    /** Apply fade-in animation when elements appear on scroll */
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
