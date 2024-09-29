import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employeeModel';
@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
})
export class EmployeeFormDialogComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: [''],
      dateOfHire: [new Date().toISOString(), Validators.required],
      jobId: [3, Validators.required],
      departmentId: [0],
      managerId: [0],
      jobTitle: [''],
      salary: [0, Validators.min(0)],
      employmentStatus: [''],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        ...this.employeeForm.value,
        dateOfHire: this.employeeForm.value.dateOfHire, 
      };

      this.employeeService.addEmployee(employeeData).subscribe(
        response => {
          console.log('Employee added successfully:', response);
        },
        error => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }
}
