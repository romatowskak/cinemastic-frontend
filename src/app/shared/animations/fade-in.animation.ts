import { trigger, animate, transition, style } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInTrigger', [
  transition('* <=> *', [style({ opacity: 0 }), animate(1400), style({ opacity: 1 })]),
]);
