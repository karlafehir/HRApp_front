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
            console.log('Employee updated successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
      } else {
        delete employeeData.id;

        this.employeeService.addEmployee(employeeData).subscribe(
          (response) => {
            console.log('Employee added successfully:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }
}
