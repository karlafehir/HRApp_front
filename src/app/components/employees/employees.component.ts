import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from './employee-form-dialog/employee-form-dialog.component';
import { Department } from '../../models/employeeModel';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [fadeInAnimation]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];
  searchText: string = '';
  displayedColumns: string[] = [ 'name', 'phoneNumber', 'department', 'job']; // Adjusted columns

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.getAllDepartments();
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  getAllDepartments(): void {
    this.departmentService.getAllDepartments().subscribe((response) => {
      this.departments = response;
    });
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find((d) => d.id === departmentId);
    return department ? department.name : 'Unknown';
  }

  getFilteredEmployees(): Employee[] {
    if (!this.searchText) {
      return this.employees;
    }
    return this.employees.filter((employee) =>
      (employee.firstName + ' ' + employee.lastName)
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  goToEmployeeProfile(employee: Employee): void {
    this.router.navigate(['employee-profile', employee.id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.loadData();
      }
    });
  }
}
