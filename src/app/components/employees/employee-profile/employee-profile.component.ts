import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../models/employeeModel';
import { EmployeeService } from '../../../services/employee.service';
import { fadeInAnimation } from '../../../shared/animations/fadeInAnimation';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  animations: [fadeInAnimation]
})
export class EmployeeProfileComponent implements OnInit {

  employee?: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.getEmployeeById(id);
      }
    });
  }

  getEmployeeById(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe((response: Employee) => {
      this.employee = response;
    });
  }

  openEditEmployeeDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Employee updated successfully');
        this.getEmployeeById(employee.id);
      }
    });
  }
}
