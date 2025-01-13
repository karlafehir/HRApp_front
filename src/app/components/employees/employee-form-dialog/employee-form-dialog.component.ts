import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { ProjectService } from '../../../services/project.service';
import { JobService } from '../../../services/job.service';
import { NotificationService } from '../../../services/notification.service';
import { Department, Employee } from '../../../models/employeeModel';
import { Job } from '../../../models/jobModel';
import { Project } from '../../../models/projectModel';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss'],
})
export class EmployeeFormDialogComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean = false;
  jobs: Job[] = [];
  departments: Department[] = [];
  projects: Project[] = [];
  roles: string[] = ['Admin', 'Employee', 'Manager']; // Predefined roles
  selectedRole: string = ''; // Role selection

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.isEdit = !!data;

    this.employeeForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      address: [data?.address || ''],
      phoneNumber: [data?.phoneNumber || ''],
      dateOfHire: [data?.dateOfHire || new Date().toISOString().split('T')[0], Validators.required],
      jobId: [data?.jobId || null],
      departmentId: [data?.departmentId || null],
      projectId: [data?.projectId || null],
      salary: [data?.salary || 0, Validators.min(0)],
      employmentStatus: [data?.employmentStatus || 'Active', Validators.required],
      role: [data?.role || 'Employee'], // Role initialization
      employeeLeaveRecord: this.fb.group({
        remainingAnnualLeave: [data?.employeeLeaveRecord?.remainingAnnualLeave || 20, Validators.min(0)],
        remainingSickLeave: [data?.employeeLeaveRecord?.remainingSickLeave || 10, Validators.min(0)],
      }),
    });

    this.selectedRole = data?.role || 'Employee'; // Set the current role
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

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employeeForm.value,
        role: this.selectedRole, // Include the selected role
        employeeLeaveRecord: { ...this.employeeForm.value.employeeLeaveRecord },
      };

      if (this.isEdit) {
        employeeData.id = this.data?.id;
        this.employeeService.updateEmployee(employeeData).subscribe(
          () => {
            this.notificationService.showNotification('Zaposlenik uspješno ažuriran.', 'success');
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.showNotification('Neuspješno ažuriranje zaposlenika.', 'error');
            console.error('Error updating employee:', error);
          }
        );
      } else {
        delete employeeData.id; // Ensure ID is not sent for new employees
        this.employeeService.addEmployee(employeeData).subscribe(
          () => {
            this.notificationService.showNotification('Zaposlenik uspješno dodan.', 'success');
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.showNotification('Neuspješno dodavanje zaposlenika.', 'error');
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }

  changeRole(email: string): void {
    if (this.selectedRole) {
      this.employeeService.assignRole(email, this.selectedRole).subscribe({
        next: (response: any) => {
          // Check for successful status even if parsing fails
          if (response?.status === 200 || typeof response === 'string') {
            this.notificationService.showNotification('Uloga uspješno promijenjena.', 'success');
          }
        },
        error: (error) => {
          if (error.status === 200) {
            // Treat 200 with parsing error as success
            this.notificationService.showNotification('Uloga uspješno promijenjena.', 'success');
          } else {
            this.notificationService.showNotification('Promjena uloge nije uspjela.', 'error');
            console.error('Error assigning role:', error);
          }
        },
      });
    }
  }
  

  onDeleteClick(): void {
    if (this.data?.id !== undefined) {
      if (confirm('Jeste li sigurni da želite obrisati ovog zaposlenika?')) {
        this.employeeService.deleteEmployee(this.data.id).subscribe(
          () => {
            this.notificationService.showNotification('Zaposlenik uspješno obrisan.', 'success');
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.showNotification('Neuspješno brisanje zaposlenika.', 'error');
            console.error('Error deleting employee:', error);
          }
        );
      }
    }
  }
}
