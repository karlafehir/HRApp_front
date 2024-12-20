import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../../models/jobModel';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: Job;
  @Output() editJob = new EventEmitter<Job>();
  @Output() deleteJob = new EventEmitter<number>();

  onEditClick() {
    this.editJob.emit(this.job);
  }

  onDeleteClick() {
    this.deleteJob.emit(this.job.id);
  }
}
