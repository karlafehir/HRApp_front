import { resolve } from 'node:path';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../../services/department.service';
import { Department, Employee } from '../../../models/employeeModel';
import { EmployeeService } from '../../../services/employee.service';
import { NotificationService } from '../../../services/notification.service';

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
    private notificationService: NotificationService,
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
      const managerId = this.departmentForm.get('managerId')?.value;
  
      this.employeeService.getEmployeeById(managerId).subscribe(
        (manager: Employee) => {
          const departmentData: Department = {
            ...this.departmentForm.value,
            manager: this.data?.manager || null, 
          };
  
          if (this.isEdit) {
            departmentData.id = this.data.id,
            this.updateDepartment(departmentData);
          } else {
            this.addDepartment(departmentData);
          }
        },
        error => {
          console.error('Error fetching manager:', error);
          this.notificationService.showNotification(
            'Greška pri dohvaćanju menadžera, pokušajte ponovno.',
            'error'
          );
        }
      );
    }
  }

  private updateDepartment(departmentData: Department): void {
    this.departmentService.updateDepartment(departmentData).subscribe(
      response => {
        console.log('Department updated successfully:', response);
        this.notificationService.showNotification('Odjel uspješno ažuriran', 'success');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error updating department:', error);
        this.notificationService.showNotification(
          'Neuspješno ažuriranje odjela, pokušajte ponovno.',
          'error'
        );
      }
    );
  }
  
  private addDepartment(departmentData: Department): void {
    this.departmentService.addDepartment(departmentData).subscribe(
      response => {
        console.log('Department added successfully:', response);
        this.notificationService.showNotification('Odjel uspješno dodan', 'success');
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error adding department:', error);
        this.notificationService.showNotification(
          'Neuspješno dodavanje odjela, pokušajte ponovno.',
          'error'
        );
      }
    );
  }
  
}
