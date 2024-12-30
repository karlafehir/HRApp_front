import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Candidate, CandidateStatus } from '../../../models/candidateModel';
import { CandidateService } from '../../../services/candidate.service';

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

  constructor(private candidateService: CandidateService) {}

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

}
