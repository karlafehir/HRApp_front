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
    { status: CandidateStatus.Prijavljen, count: 0, candidates: [] },
    { status: CandidateStatus.Intervju, count: 0, candidates: [] },
    { status: CandidateStatus.Onboarding, count: 0, candidates: [] },
    { status: CandidateStatus.Zaposlen, count: 0, candidates: [] },
    { status: CandidateStatus.Odbijen, count: 0, candidates: [] }
  ];

  getStatusBackgroundColor(status: CandidateStatus): string {
    switch (status) {
        case CandidateStatus.Prijavljen:
            return 'var(--green-pastel)'; 
        case CandidateStatus.Intervju:
            return 'var(--blue-pastel)'; 
        case CandidateStatus.Onboarding:
            return 'var(--yellow-pastel)'; 
        case CandidateStatus.Zaposlen:
            return 'var(--purple-pastel)'; 
        case CandidateStatus.Odbijen:
            return 'var(--red-pastel)';
        default:
            return 'var(--secondary-color)';
    }
  }
  
  getStatusTextColor(status: CandidateStatus): string {
    switch (status) {
        case CandidateStatus.Prijavljen:
            return 'var(--green)'; 
        case CandidateStatus.Intervju:
            return 'var(--blue)';
        case CandidateStatus.Onboarding:
            return 'var(--yellow)'; 
        case CandidateStatus.Zaposlen:
            return 'var(--purple)'; 
        case CandidateStatus.Odbijen:
            return 'var(--red)';
        default:
            return 'var(--primary-color)';
    }
  }

  candidates: Candidate[] = [];
  jobs: Job[] = []; 
  selectedJobId: number | undefined = 6009; 

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
    switch (status) {
        case CandidateStatus.Prijavljen:
            return 'Prijavljen';
        case CandidateStatus.Intervju:
            return 'Intervju';
        case CandidateStatus.Onboarding:
            return 'Onboarding';
        case CandidateStatus.Zaposlen:
            return 'Zaposlen';
        case CandidateStatus.Odbijen:
            return 'Odbijen';
        default:
            return 'Nepoznat status';
    }
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
