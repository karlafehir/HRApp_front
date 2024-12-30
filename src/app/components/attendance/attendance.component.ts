import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  animations: [fadeInAnimation]
})
export class AttendanceComponent implements OnInit {

  employees: Employee[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'sickLeaveDays', 'remainingSickLeave', 'annualLeaveDays', 'remainingAnnualLeave'];

  constructor(private router: Router, private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(response => {
      this.employees = response.map(employee => ({
        ...employee,
        sickLeaveDays: employee.employeeLeaveRecord?.sickLeaveDays || 0,
        remainingSickLeave: employee.employeeLeaveRecord?.remainingSickLeave || 0,
        annualLeaveDays: employee.employeeLeaveRecord?.annualLeaveDays || 0,
        remainingAnnualLeave: employee.employeeLeaveRecord?.remainingAnnualLeave || 0,
      }));
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
  }
}
