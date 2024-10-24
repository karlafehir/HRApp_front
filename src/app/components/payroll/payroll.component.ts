import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { EmployeeService } from '../../services/employee.service';
import { PayrollEmployee } from '../../models/payrollEmployeeModel'; // Ensure you import the model

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  animations: [fadeInAnimation]
})
export class PayrollComponent implements OnInit {
  payrollEmployees: PayrollEmployee[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['name', 'department', 'salary', 'paymentDate', 'paymentMethod'];

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllPayrollEmployees();
  }

  getAllPayrollEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(response => {
      this.payrollEmployees = response.map(employee => ({
        employee,
        status: 'pending',
        salary: 0,
        paymentDate: null, 
        paymentMethod: 'Bank Transfer' 
      }));
    });
    console.log(this.payrollEmployees);
  }

  getFilteredPayrollEmployees(): PayrollEmployee[] {
    if (!this.searchText) {
      return this.payrollEmployees;
    }
    return this.payrollEmployees.filter(payrollEmployee =>
      (payrollEmployee.employee.firstName + ' ' + payrollEmployee.employee.lastName).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // goToEmployeeProfile(employee: Employee): void {
  //   this.router.navigate(['employee-profile', employee.id]);
  // }
}
