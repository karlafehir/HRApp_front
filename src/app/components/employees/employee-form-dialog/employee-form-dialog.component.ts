import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employeeModel';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
})
export class EmployeeFormDialogComponent {
  employeeForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
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
      dateOfHire: [data?.dateOfHire || new Date().toISOString(), Validators.required],
      jobId: [data?.jobId || 0, Validators.required],
      departmentId: [data?.departmentId || 0],
      managerId: [data?.managerId || 0],
      jobTitle: [data?.jobTitle || ''],
      salary: [data?.salary || 0, Validators.min(0)],
      employmentStatus: [data?.employmentStatus || ''],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employeeForm.value,
        id: this.data?.id || null,
      };

      if (this.isEdit) {
        this.employeeService.updateEmployee(employeeData).subscribe(
          response => {
            console.log('Employee updated successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating employee:', error);
          }
        );
      } else {
        this.employeeService.addEmployee(employeeData).subscribe(
          response => {
            console.log('Employee added successfully:', response);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error adding employee:', error);
          }
        );
      }
    }
  }
}
