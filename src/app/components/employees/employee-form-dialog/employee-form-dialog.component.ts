import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { Department, Employee } from '../../../models/employeeModel';
import { Job } from '../../../models/jobModel';
import { Project } from '../../../models/projectModel';
import { JobService } from '../../../services/job.service';
import { DepartmentService } from '../../../services/department.service';
import { ProjectService } from '../../../services/project.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
})
export class EmployeeFormDialogComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean = false;
  jobs: Job[] = [];
  departments: Department[] = [];
  managers: Employee[] = [];
  projects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.isEdit = !!data;

    this.employeeForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      address: [data?.address || ''],
      phoneNumber: [data?.phoneNumber || ''],
      // dateOfHire: [data?.dateOfHire || new Date().toISOString(), Validators.required],
      dateOfHire: [data?.dateOfHire || new Date().toISOString().split('T')[0], Validators.required],
      jobId: [data?.jobId || null],
      departmentId: [data?.departmentId || null],
      projectId: [data?.projectId || null],
      jobTitle: [data?.jobTitle || ''],
      salary: [data?.salary || 0, Validators.min(0)],
      employmentStatus: [data?.employmentStatus || '', Validators.required],
      employeeLeaveRecord: this.fb.group({
        // id: [data?.employeeLeaveRecord?.id || null], // Include the ID
        annualLeaveDays: [data?.employeeLeaveRecord?.annualLeaveDays || 20, [Validators.min(0)]],
        sickLeaveDays: [data?.employeeLeaveRecord?.sickLeaveDays || 10, [Validators.min(0)]],
        remainingAnnualLeave: [data?.employeeLeaveRecord?.remainingAnnualLeave || 20, [Validators.min(0)]],
        remainingSickLeave: [data?.employeeLeaveRecord?.remainingSickLeave || 10, [Validators.min(0)]],
      }),
    });
    
  }

  ngOnInit() {
    this.loadJobs();
    this.loadDepartments();
    this.loadProjects();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(
      (jobs) => {
        this.jobs = jobs;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  onDeleteClick() {
    if (this.data?.id !== undefined) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeService.deleteEmployee(this.data.id).subscribe({
          next: (response) => {
            this.notificationService.showNotification('Employee successfully deleted.', 'success');
          },
          error: (error) => {
            if (error.status === 200) {
              // Handle the case where the status is 200 but Angular treats it as an error
              console.warn('Handled 200 OK error:', error);
              this.notificationService.showNotification('Employee successfully deleted.', 'success');
              this.dialogRef.close(true);
            } else {
              console.error('Error deleting employee:', error);
              this.notificationService.showNotification('Failed to delete employee. Please try again.', 'error');
            }
          }
        });
        this.router.navigate(['/employees'])
      }
    } else {
      console.error('Employee ID is undefined.');
      this.notificationService.showNotification('Employee ID is missing. Unable to delete.', 'error');
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employeeForm.value,
        employeeLeaveRecord: { ...this.employeeForm.value.employeeLeaveRecord },
      };

      if (this.isEdit) {
        employeeData.id = this.data?.id;

        this.employeeService.updateEmployee(employeeData).subscribe(
          (response) => {
            this.notificationService.showNotification("Zaposlenik uspješno ažuriran", 'success')
            console.log('Employee updated successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.showNotification("Neuspješno ažuriranje zaposlenika, pokušajte ponovno", 'error')
            console.error('Error updating employee:', error);
          }
        );
      } else {
        delete employeeData.id;

        this.employeeService.addEmployee(employeeData).subscribe(
          (response) => {
            this.notificationService.showNotification("Zaposlenik uspješno dodan", 'success')
            console.log('Employee added successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.showNotification("Neuspješno dodavanje zaposlenika, pokušajte ponovno", 'error')
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }
}
