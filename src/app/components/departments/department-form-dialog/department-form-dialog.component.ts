import { resolve } from 'node:path';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../../services/department.service';
import { Department, Employee } from '../../../models/employeeModel';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-department-form-dialog',
  templateUrl: './department-form-dialog.component.html',
})
export class DepartmentFormDialogComponent implements OnInit{
  departmentForm: FormGroup;
  isEdit: boolean = false;
  managers: Employee [] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<DepartmentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department 
  ) {
    this.isEdit = !!data;

    this.departmentForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      managerId: [data?.managerId || 0, Validators.required],
      employees: [data?.employees || []], 
    });
  }

  ngOnInit() {
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
    if (this.departmentForm.valid) {
      const departmentData: Department = {
        ...this.departmentForm.value,
        manager: this.data?.manager || null, 
      };
      if (this.isEdit) {
        this.departmentService.updateDepartment(departmentData).subscribe(
          response => {
            console.log('Department updated successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating department:', error);
          }
        );
      } else {
        this.departmentService.addDepartment(departmentData).subscribe(
          response => {
            console.log('Department added successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding department:', error);
          }
        );
      }
    }
  }
}
