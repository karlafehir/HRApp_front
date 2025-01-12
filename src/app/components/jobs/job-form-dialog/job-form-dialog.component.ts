import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../../services/job.service';
import { DepartmentService } from '../../../services/department.service';
import { Job } from '../../../models/jobModel';
import { Department } from '../../../models/employeeModel';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-job-form-dialog',
  templateUrl: './job-form-dialog.component.html',
})
export class JobFormDialogComponent implements OnInit {
  jobForm: FormGroup;
  isEdit: boolean = false;
  priorityOptions = [
    { value: 1, label: 'Visok' },
    { value: 2, label: 'Srednji' },
    { value: 3, label: 'Nizak' }
  ];
  departmentOptions: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<JobFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job
  ) {
    this.isEdit = !!data;
    this.jobForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      departmentId: [data?.departmentId || '', Validators.required],
      postedDate: [
        data?.postedDate ? this.formatDate(data.postedDate) : new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      closingDate: [
        data?.closingDate ? this.formatDate(data.closingDate) : '',
      ],
      priority: [data?.priority || 2, Validators.required],
      location: [data?.location || '', Validators.required],
    });    
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]; // Format as yyyy-MM-dd
    } else {
      return new Date(date).toISOString().split('T')[0]; // Convert string to Date, then format
    }
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
            this.notificationService.showNotification("Oglas uspješno ažuriran", 'success')
            console.log('Job updated successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            this.notificationService.showNotification("Neusješno ažuriranje oglasa, pokušajte ponovno", 'error')
            console.error('Error updating job:', error);
          }
        );
      } else {
        this.jobService.addJob(jobData).subscribe(
          response => {
            this.notificationService.showNotification("Oglas uspješno dodan", 'success')
            console.log('Job added successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            this.notificationService.showNotification("Neusješno dodavanje oglasa, pokušajte ponovno", 'error')
            console.error('Error adding job:', error);
          }
        );
      }
    }
  }
}
