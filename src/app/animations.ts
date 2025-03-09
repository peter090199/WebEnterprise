import { trigger, transition, style, animate } from '@angular/animations';
import { query, group } from '@angular/animations';

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }), // Start off-screen and invisible
    animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // Slide up into view
  ]),
  transition(':leave', [
    animate('0.5s ease-in', style({ transform: 'translateY(100%)', opacity: 0 })) // Slide down out of view
  ])
]);
// Slide Fade Animation
export const slideFade = trigger('slideFade', [
    transition(':enter', [
      style({ transform: 'translateY(50%)', opacity: 0 }), // Start from slightly below and invisible
      animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // Slide to position and fade in
    ]),
    transition(':leave', [
      animate('0.5s ease-in', style({ transform: 'translateY(50%)', opacity: 0 })) // Slide down and fade out
    ])
  ]);

  export const slideInAnimation = trigger('routeAnimations', [
    transition('SignUpPage => ClientPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
      ]),
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
      ]),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })),
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
        ]),
      ]),
    ]),
    transition('ClientPage => SignUpPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
      ]),
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
      ]),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 })),
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
        ]),
      ]),
    ]),
  ]);