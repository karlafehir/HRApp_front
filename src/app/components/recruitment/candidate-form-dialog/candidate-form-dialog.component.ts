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
      resumeUrl: [data?.resumeUrl || ''],
      jobId: [data?.jobId || null, Validators.required],
      status: [data?.status || 'NewApplied', Validators.required],
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

  onSubmit() {
    if (this.candidateForm.valid) {
      const candidateData: Candidate = { ...this.candidateForm.value };
  
      if (this.isEdit) {
        candidateData.id = this.data?.id; 
  
        this.candidateService.updateCandidate(candidateData).subscribe(
          (response) => {
            console.log('Candidate updated successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating candidate:', error);
          }
        );
      } else {
        this.candidateService.addCandidate(candidateData).subscribe(
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
