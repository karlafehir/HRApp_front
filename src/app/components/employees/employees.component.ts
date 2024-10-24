import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from './employee-form-dialog/employee-form-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [fadeInAnimation]
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'department', 'dateOfHire']; // Adjusted columns

  constructor(private router: Router, private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(response => {
      this.employees = response;
    });
  }

  getFilteredEmployees(): Employee[] {
    if (!this.searchText) {
      return this.employees;
    }
    return this.employees.filter(employee =>
      (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  goToEmployeeProfile(employee: Employee): void {
    this.router.navigate(['employee-profile', employee.id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.getAllEmployees();
      }
    });
  }
}
