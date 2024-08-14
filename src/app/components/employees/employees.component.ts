import { Component } from '@angular/core';
import { Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT', dateOfJoining: new Date('2019-01-15') },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'HR', dateOfJoining: new Date('2020-03-22') },
    { id: 3, name: 'Alice Johnson', position: 'Product Manager', department: 'Marketing', dateOfJoining: new Date('2018-06-12') },
  ];

  searchText: string = '';

  displayedColumns: string[] = ['id', 'name', 'position', 'department', 'dateOfJoining'];

  constructor(private router: Router) {}

  getFilteredEmployees(): Employee[] {
    if (!this.searchText) {
      return this.employees;
    }
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  goToEmployeeProfile(){
    this.router.navigate(['employee-profile'])
  }
}
