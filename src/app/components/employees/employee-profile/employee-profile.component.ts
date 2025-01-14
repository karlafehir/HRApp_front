import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../models/employeeModel';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentService } from '../../../services/department.service';
import { ProjectService } from '../../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth/Auth.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {
  employee?: Employee;
  department?: any;
  project?: any;
  role: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.getEmployeeById(id);
      }
    });
    this.role = this.authService.getRole();
  }

  getEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe((response: Employee) => {
      this.employee = response;
      if (response.departmentId) {
        this.getDepartmentById(response.departmentId);
      }
      if (response.projectId) {
        this.getProjectById(response.projectId);
      }
    });
  }

  getDepartmentById(departmentId: number): void {
    this.departmentService.getDepartmentById(departmentId).subscribe((response) => {
      this.department = response;
    });
  }

  getProjectById(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe((response) => {
      this.project = response;
    });
  }

  openEditEmployeeDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Employee updated successfully');
        if (employee.id !== undefined && employee.id !== null) {
          this.getEmployeeById(employee.id);
        } else {
          console.error('Employee ID is undefined or null');
        }
      }
    });
  }
}
