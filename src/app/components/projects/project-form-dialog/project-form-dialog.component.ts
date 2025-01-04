import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/projectModel';
import { Employee } from '../../../models/employeeModel';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
})
export class ProjectFormDialogComponent implements OnInit {
  projectForm: FormGroup;
  isEdit: boolean = false;
  managers: Employee [] = [];
  

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.isEdit = !!data;
    this.projectForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      managerId: [data?.managerId || 0, Validators.required],
      description: [data?.description || '', Validators.required],
      startDate: [data?.startDate || new Date().toISOString().split('T')[0], Validators.required],
      endDate: [data?.endDate || '']
    });
  }

  ngOnInit(): void {
    this.GetEmployeesWithRoleManager();
  }

  GetEmployeesWithRoleManager() {
    this.employeeService.GetEmployeesWithRoles("Manager").subscribe(
      (response) => {
        this.managers = response;
        console.log(this.managers)
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const projectData: Project = {
        ...this.projectForm.value,
        projectId: this.isEdit ? this.data.id : 0 
      };

      if (this.isEdit) {
        this.projectService.updateProject(projectData.id, projectData).subscribe(
          response => {
            console.log('Project updated successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating project:', error);
          }
        );
      } else {
        this.projectService.addProject(projectData).subscribe(
          response => {
            console.log('Project added successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding project:', error);
          }
        );
      }
    }
  }
}
