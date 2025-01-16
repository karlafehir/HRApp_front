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

  getDepartmentImage(departmentId: number): string {
    const imageMap: { [key: number]: string } = {
      3002: 'assets/icons/finance.png',
      3004: 'assets/icons/marketing.png',
      4003: 'assets/icons/developer.png',
      4011: 'assets/icons/sales.png',
      4012: 'assets/icons/hr.png',
      4013: 'assets/icons/finance.png',
      4021: 'assets/icons/design.png',
      4023: 'assets/icons/project-manager.png',
      4022: 'assets/icons/developer.png',
      4024: 'assets/icons/security.png',
    };

    return imageMap[departmentId] || 'assets/icons/default.png'; // Fallback to a default image
  }

}
