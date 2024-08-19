import { Component } from '@angular/core';
import { fadeInAnimation } from '../../../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  animations: [fadeInAnimation]
})

export class EmployeeProfileComponent {
  employee = {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'IT',
    dateOfJoining: new Date('2019-01-15'),
  };
}
