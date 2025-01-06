import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Candidate, CandidateStatus } from '../../../models/candidateModel';
import { CandidateService } from '../../../services/candidate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';

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

  constructor(
    private candidateService: CandidateService, 
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
  ) {}

  @Output() statusUpdated = new EventEmitter<void>();

  updateStatus(candidate: Candidate): void {
    this.candidateService.updateCandidate(candidate).subscribe(
      () => {
        this.notificationService.showNotification("Status kandidata uspješno ažuriran", 'success')
        console.log(`Status updated successfully for candidate ${candidate.name}`);
        this.statusUpdated.emit(); // Notify parent
      },
      (error) => {
        this.notificationService.showNotification("Status kandidata neuspješno ažuriran, pokušajte ponovno", 'error')
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
      this.notificationService.showNotification("Neuspješno otvaranje životopisa", 'error')
    }
  }

  viewGithub(candidate: Candidate): void {
    if (candidate.githubUrl) {
        window.open(candidate.githubUrl, '_blank');
    } else {
      this.notificationService.showNotification("Github profil ne postoji", 'error')
    }
  }

}
