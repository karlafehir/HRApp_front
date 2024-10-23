import { Component, OnInit } from '@angular/core';
import { Department, Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { EmployeeService } from '../../services/employee.service';
import { PayrollEmployee } from '../../models/payrollEmployeeModel'; // Ensure you import the model
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  animations: [fadeInAnimation]
})
export class DepartmentsComponent implements OnInit {
  


  departments: Department[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['id', 'name', 'managerName', 'managerPhone', 'employeesCount']; // Adjusted columns

  constructor(private router: Router, private departmentService: DepartmentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(response => {
      this.departments = response;
    });
  }

  getFilteredDepartments(): Department[] {
    if (!this.searchText) {
      return this.departments;
    }
    return this.departments.filter(department =>
      department.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  goToDepartmentDetail(department: Department): void {
    this.router.navigate(['department-detail', department.id]);
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(DepartmentFormDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Dialog closed with result:', result);
    //   }
    // });
  }

}
