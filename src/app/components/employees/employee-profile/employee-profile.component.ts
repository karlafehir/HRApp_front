import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, EmployeeLeaveRecord } from '../../../models/employeeModel';
import { EmployeeService } from '../../../services/employee.service';
import { fadeInAnimation } from '../../../shared/animations/fadeInAnimation';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  animations: [fadeInAnimation],
})
export class EmployeeProfileComponent implements OnInit {
  employee?: Employee;

  constructor(
    private employeeService: EmployeeService,
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
  }

  getEmployeeById(id?: number): void {
    if (id !== undefined && id !== null) {
      this.employeeService.getEmployeeById(id).subscribe((response: Employee) => {
        this.employee = response;
      });
    } else {
      this.notificationService.showNotification("Zaposlenik ne postoji", 'error')
      console.error('Employee ID is undefined or null');
    }
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
