import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Job } from '../../../models/jobModel';
import { JobPriority } from '../../../enums/jobPriority';
import { CandidateFormDialogComponent } from '../../recruitment/candidate-form-dialog/candidate-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/Auth.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent implements OnInit{
  @Input() job!: Job;
  @Output() editJob = new EventEmitter<Job>();
  @Output() deleteJob = new EventEmitter<number>();

  JobPriority = JobPriority; 
  role: string | null = null;
  
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  onEditClick() {
    this.editJob.emit(this.job);
  }

  onDeleteClick() {
    this.deleteJob.emit(this.job.id);
  }

  openApplyDialog(): void {
    const dialogRef = this.dialog.open(CandidateFormDialogComponent, {
      data: { jobId: this.job.id, jobTitle: this.job.title }, // Pass jobId as part of data
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }  

}
