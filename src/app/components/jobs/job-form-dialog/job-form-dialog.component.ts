import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../../services/job.service';
import { DepartmentService } from '../../../services/department.service';
import { Job } from '../../../models/jobModel';
import { Department } from '../../../models/employeeModel';

@Component({
  selector: 'app-job-form-dialog',
  templateUrl: './job-form-dialog.component.html',
})
export class JobFormDialogComponent implements OnInit {
  jobForm: FormGroup;
  isEdit: boolean = false;
  priorityOptions = ['High', 'Medium', 'Low'];
  locationOptions = ['Remote', 'Office', 'Hybrid'];
  statusOptions = ['Open', 'Closed'];
  departmentOptions: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<JobFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {
    this.isEdit = !!data;
    this.jobForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      departmentId: [data?.departmentId || '', Validators.required], // Updated field
      postedDate: [data?.postedDate || new Date().toISOString(), Validators.required],
      closingDate: [data?.closingDate || '', Validators.required],
      status: [data?.status || 'Open', Validators.required],
      location: [data?.location || '', Validators.required],
      priority: [data?.priority || 'Medium', Validators.required],
      candidates: [[]],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.departmentOptions = departments;
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
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
