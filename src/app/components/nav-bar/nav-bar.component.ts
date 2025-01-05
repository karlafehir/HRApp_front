import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/Auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employeeModel';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/jobModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  employeeInfo: Employee | null = null;
  jobInfo: Job | null = null;

  get displayName(): string {
    if (!this.employeeInfo) {
      return 'admin';
    }
    return `${this.employeeInfo.firstName} ${this.employeeInfo.lastName}`;
  }

  get displayJobTitle(): string {
    return this.jobInfo ? this.jobInfo.title : '';
  }

  constructor(
    private authService: AuthService, 
    private router: Router,
    private employeeService: EmployeeService,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.loadEmployeeInfo();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['jobs']);
  }

  onLogin() {
    this.router.navigate(['/login']); 
  }

  navigateToJobs() {
    this.router.navigate(['/jobs']);
  }

  navigateToProfile() {
    const employeeId = this.authService.getEmployeeId();
    this.router.navigate([`/employee-profile/${employeeId}`]); 
  }

  private loadEmployeeInfo() {
    const employeeId = this.authService.getEmployeeId();
    const numericEmployeeId = Number(employeeId);

    if (!isNaN(numericEmployeeId)) {
      this.employeeService.getEmployeeById(numericEmployeeId).subscribe({
        next: (employee) => {
          this.employeeInfo = employee;
          if (employee.jobId) {
            this.loadJobInfo(employee.jobId);
          }
        },
        error: (err) => {
          console.error('Error fetching employee info:', err);
        }
      });
    } else {
      console.error('Invalid employee ID:', employeeId);
    }
  }

  private loadJobInfo(jobId: number) {
    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        this.jobInfo = job;
      },
      error: (err) => {
        console.error('Error fetching job info:', err);
      }
    });
  }
}
