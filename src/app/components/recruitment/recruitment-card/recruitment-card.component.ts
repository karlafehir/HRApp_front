import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Candidate, CandidateStatus } from '../../../models/candidateModel';
import { CandidateService } from '../../../services/candidate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recruitment-card',
  templateUrl: './recruitment-card.component.html',
  styleUrls: ['./recruitment-card.component.scss']
})

export class RecruitmentCardComponent {
  @Input() candidate! : Candidate;

  candidateStatuses = [
    { value: CandidateStatus.NewApplied, label: 'New Applied' },
    { value: CandidateStatus.Shortlisted, label: 'Shortlisted' },
    { value: CandidateStatus.Interview, label: 'Interview' },
    { value: CandidateStatus.Test, label: 'Test' },
    { value: CandidateStatus.Hired, label: 'Hired' }
  ];

  constructor(private candidateService: CandidateService, private snackBar: MatSnackBar) {}

  @Output() statusUpdated = new EventEmitter<void>();

  updateStatus(candidate: Candidate): void {
    this.candidateService.updateCandidate(candidate).subscribe(
      () => {
        console.log(`Status updated successfully for candidate ${candidate.name}`);
        this.statusUpdated.emit(); // Notify parent
      },
      (error) => {
        console.error(`Error updating status for candidate ${candidate.name}:`, error);
      }
    );
  }

  viewResume(candidate: Candidate): void {
    const baseUrl = 'http://localhost:5032'; 

    if (candidate.resumeUrl) {
      const fullUrl = candidate.resumeUrl.startsWith('http')
        ? candidate.resumeUrl
        : `${baseUrl}${candidate.resumeUrl}`;
      window.open(fullUrl, '_blank');
    } else {
      this.snackBar.open('No resume file uploaded for this candidate.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
}

}
