import { Component, OnInit } from '@angular/core';
import { Department, Employee } from '../../models/employeeModel';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { DepartmentFormDialogComponent } from './department-form-dialog/department-form-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  animations: [fadeInAnimation]
})
export class DepartmentsComponent implements OnInit {
  


  departments: Department[] = [];
  searchText: string = '';
  displayedColumns: string[] = [ 'name', 'managerName', 'managerPhone', 'employeesCount']; // Adjusted columns

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
    const dialogRef = this.dialog.open(DepartmentFormDialogComponent, {
      data: department, 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllDepartments();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DepartmentFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.getAllDepartments();
      }
    });
  }

}
