import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../../services/job.service';
import { Candidate, CandidateStatus } from '../../../models/candidateModel';
import { Job } from '../../../models/jobModel';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-candidate-form-dialog',
  templateUrl: './candidate-form-dialog.component.html',
})
export class CandidateFormDialogComponent implements OnInit {
  candidateForm: FormGroup;
  isEdit: boolean = false;
  jobs: Job[] = [];
  selectedFile: File | null = null;

  candidateStatuses = [
    { value: CandidateStatus.NewApplied, label: 'New Applied' },
    { value: CandidateStatus.Shortlisted, label: 'Shortlisted' },
    { value: CandidateStatus.Interview, label: 'Interview' },
    { value: CandidateStatus.Test, label: 'Test' },
    { value: CandidateStatus.Hired, label: 'Hired' }
  ];

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private jobService: JobService,
    private dialogRef: MatDialogRef<CandidateFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate
  ) {
    this.isEdit = !!data;

    this.candidateForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phone: [data?.phone || '', Validators.required],
      jobId: [data?.jobId || null, Validators.required],
      status: [data?.status || CandidateStatus.NewApplied, Validators.required],
    });
  }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const formData = new FormData();
      formData.append('name', this.candidateForm.get('name')?.value);
      formData.append('email', this.candidateForm.get('email')?.value);
      formData.append('phone', this.candidateForm.get('phone')?.value);
      formData.append('jobId', this.candidateForm.get('jobId')?.value);
      formData.append('status', this.candidateForm.get('status')?.value);
      if (this.selectedFile) {
        formData.append('resumeFile', this.selectedFile);
      }

      if (this.isEdit) {
        formData.append('id', this.data.id.toString());
        this.candidateService.updateCandidateWithFile(formData).subscribe(
          (response) => {
            console.log('Candidate updated successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating candidate:', error);
          }
        );
      } else {
        this.candidateService.addCandidateWithFile(formData).subscribe(
          (response) => {
            console.log('Candidate added successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding candidate:', error);
          }
        );
      }
    }
  }
  
}
