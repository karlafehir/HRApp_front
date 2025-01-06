import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Candidate, CandidateStatus } from '../../models/candidateModel';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/jobModel';
import { MatDialog } from '@angular/material/dialog';
import { CandidateFormDialogComponent } from './candidate-form-dialog/candidate-form-dialog.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss'],
  animations: [fadeInAnimation]
})
export class RecruitmentComponent implements OnInit {

  recruitmentStatuses: { status: CandidateStatus, count: number, candidates: Candidate[] }[] = [
    { status: CandidateStatus.NewApplied, count: 0, candidates: [] },
    { status: CandidateStatus.Shortlisted, count: 0, candidates: [] },
    { status: CandidateStatus.Interview, count: 0, candidates: [] },
    { status: CandidateStatus.Test, count: 0, candidates: [] },
    { status: CandidateStatus.Hired, count: 0, candidates: [] }
  ];

  getStatusBackgroundColor(status: CandidateStatus): string {
    switch (status) {
      case CandidateStatus.NewApplied:
        return 'var(--green-pastel)'; 
      case CandidateStatus.Shortlisted:
        return 'var(--yellow-pastel)'; 
      case CandidateStatus.Interview:
        return 'var(--blue-pastel)';
      case CandidateStatus.Test:
        return 'var(--purple-pastel)';
      case CandidateStatus.Hired:
        return 'var(--red-pastel)';
      default:
        return 'var(--secondary-color)';
    }
  }
  
  getStatusTextColor(status: CandidateStatus): string {
    switch (status) {
      case CandidateStatus.NewApplied:
        return 'var(--green)';
      case CandidateStatus.Shortlisted:
        return 'var(--yellow)';
      case CandidateStatus.Interview:
        return 'var(--blue)'; 
      case CandidateStatus.Test:
        return 'var(--purple)';
      case CandidateStatus.Hired:
        return 'var(--red)';
      default:
        return 'var(--primary-color)';
    }
  }
  

  candidates: Candidate[] = [];
  jobs: Job[] = []; 
  selectedJobId: number | undefined = 4003; 

  constructor(
    private jobService: JobService, 
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadAllJobs();
  }

  loadAllJobs(): void {
    this.jobService.getAllJobs().subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
        if (this.jobs.length > 0 && !this.selectedJobId) {
          this.selectedJobId = this.jobs[0].id; 
        }
        this.GetJobByIdWithCandidates();
      },
      error => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  GetJobByIdWithCandidates(): void {
    if (!this.selectedJobId) {
      console.error('No job selected');
      return;
    }

    this.jobService.getJobByIdWithCandidates(this.selectedJobId).subscribe(
      (response: Job) => {
        this.candidates = response.candidates;
        this.groupCandidatesByStatus();
        if (this.candidates.length == 0){
          this.notificationService.showNotification("Ne postoji lista kandidata", 'error')
        }
      },
      error => {
        console.error('Error fetching candidates:', error);
      }
    );
  }

  private groupCandidatesByStatus(): void {
    this.recruitmentStatuses.forEach(status => {
      status.count = 0;
      status.candidates = [];
    });

    this.candidates.forEach(candidate => {
      const statusGroup = this.recruitmentStatuses.find(group => group.status === candidate.status);
      if (statusGroup) {
        statusGroup.candidates.push(candidate);
        statusGroup.count++;
      }
    });
  }

  getStatusLabel(status: CandidateStatus): string {
    return CandidateStatus[status];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CandidateFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.GetJobByIdWithCandidates();
      }
    });
  }
}
