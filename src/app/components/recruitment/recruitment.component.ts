import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Candidate, CandidateStatus } from '../../models/candidateModel';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/jobModel';
import { MatDialog } from '@angular/material/dialog';
import { CandidateFormDialogComponent } from './candidate-form-dialog/candidate-form-dialog.component';

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

  candidates: Candidate[] = [];

  constructor(private jobService: JobService,  public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetJobByIdWithCandidates();
  }

  GetJobByIdWithCandidates(){
    this.jobService.getJobByIdWithCandidates(4003).subscribe(
      (response: Job) => {
        this.candidates = response.candidates;
        this.groupCandidatesByStatus();
        console.log(this.candidates);
      },
      error => {
        console.error('Error fetching candidates:', error);
      }
    );
  }

  private groupCandidatesByStatus() {
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
