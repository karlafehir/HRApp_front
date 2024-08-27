import { Component, Input, OnInit } from '@angular/core';
import { JobService } from '../../../services/job.service';
import { Job } from '../../../models/jobModel';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: Job;
}
