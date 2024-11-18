import { Component } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInAnimation]
})
export class LayoutComponent {
 
} 
