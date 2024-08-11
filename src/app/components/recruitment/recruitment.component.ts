import { Component } from '@angular/core';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})

export class RecruitmentComponent {

  recruitmentStatuses: any[] = [
    { status: 'New Applied', count: 4 },
    { status: 'Interview', count: 2 },
    { status: 'Hired', count: 3 }
  ];

}
