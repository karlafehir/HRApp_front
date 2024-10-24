import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../../services/job.service'; 
import { Job } from '../../../models/jobModel';

@Component({
  selector: 'app-job-form-dialog',
  templateUrl: './job-form-dialog.component.html',
})
export class JobFormDialogComponent {
  jobForm: FormGroup;
  isEdit: boolean = false;
  priorityOptions = ['High', 'Medium', 'Low'];
  locationOptions = ['Remote', 'Office', 'Hybrid'];
  statusOptions = ['Open', 'Closed'];
  departmentOptions = ['Engineering', 'Sales', 'Marketing', 'HR'];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService, 
    private dialogRef: MatDialogRef<JobFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job 
  ) {
    this.isEdit = !!data;

    this.jobForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      department: [data?.department || '', Validators.required],
      postedDate: [data?.postedDate || new Date().toISOString(), Validators.required],
      closingDate: [data?.closingDate || '', Validators.required],
      status: [data?.status || 'Open', Validators.required],
      location: [data?.location || '', Validators.required],
      priority: [data?.priority || 'Medium', Validators.required],
      candidates: [[]],  
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const jobData: Job = {
        ...this.jobForm.value,
      };
  
      if (this.isEdit) {
        jobData.id = this.data.id;
  
        this.jobService.updateJob(jobData).subscribe(
          response => {
            console.log('Job updated successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating job:', error);
          }
        );
      } else {
        // When adding, make sure the `id` is not sent
        delete jobData.id;
  
        this.jobService.addJob(jobData).subscribe(
          response => {
            console.log('Job added successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding job:', error);
          }
        );
      }
    }
  }
}
