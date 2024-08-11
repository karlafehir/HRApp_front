import { Component } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss'],
  animations: [fadeInAnimation]
})

export class RecruitmentComponent {

  recruitmentStatuses: any[] = [
    { status: 'New Applied', count: 4 },
    { status: 'Interview', count: 2 },
    { status: 'Hired', count: 3 }
  ];

}
