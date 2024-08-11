import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }), // Start below by 20 pixels
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Animate to the original position
  ])
]);
