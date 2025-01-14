import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateService } from '../../../services/candidate.service';
import { CandidateStatus } from '../../../models/candidateModel';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-candidate-form-dialog',
  templateUrl: './candidate-form-dialog.component.html',
  styleUrls: ['./candidate-form-dialog.component.scss'],
})
export class CandidateFormDialogComponent implements OnInit {
  candidateForm: FormGroup;
  isEdit: boolean = false;
  selectedFile: File | null = null;
  jobId!: number; 
  jobTitle: string;

  candidateStatuses = [
    { value: CandidateStatus.Prijavljen, label: 'Prijavljen' },
    { value: CandidateStatus.Intervju, label: 'Intervju' },
    { value: CandidateStatus.Onboarding, label: 'Onboarding' },
    { value: CandidateStatus.Zaposlen, label: 'Zaposlen' },
    { value: CandidateStatus.Odbijen, label: 'Osbijen' }
  ];

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<CandidateFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobId?: number; jobTitle?: string }

  ) {
    this.jobId = data.jobId!;
    this.jobTitle = data.jobTitle!;
    this.isEdit = false; 

    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      githubUrl: [
        '',
        Validators.pattern('^(https?://)?(www.)?github.com/([a-zA-Z0-9_-]+)$'),
      ],
      status: [CandidateStatus.Prijavljen, Validators.required],
    });
  }

  ngOnInit(): void {
    // this.notificationService.showNotification("Uspješno ste se prijavili na oglas", 'success')
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const formData = new FormData();
      formData.append('name', this.candidateForm.get('name')?.value);
      formData.append('email', this.candidateForm.get('email')?.value);
      formData.append('phone', this.candidateForm.get('phone')?.value);
      formData.append('githubUrl', this.candidateForm.get('githubUrl')?.value);
      formData.append('status', this.candidateForm.get('status')?.value);
      formData.append('jobId', this.jobId.toString()); 

      if (this.selectedFile) {
        formData.append('resumeFile', this.selectedFile);
      }

      this.candidateService.addCandidateWithFile(formData).subscribe(
        (response) => {
          this.notificationService.showNotification("Uspješno ste se prijavili na oglas", 'success')
          console.log('Candidate added successfully:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          this.notificationService.showNotification("Neusješno prijavljivanje na oglas, pokušajte ponovno", 'error')
          console.error('Error adding candidate:', error);
        }
      );
    }
  }
}
