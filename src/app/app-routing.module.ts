import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeProfileComponent } from './components/employees/employee-profile/employee-profile.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'recruitment',
    component: RecruitmentComponent
  },
  {
    path: 'employees',
    component: EmployeesComponent
  },
  {
    path: 'employee-profile/:id',
    component: EmployeeProfileComponent
  },
  {
    path: 'payroll',
    component: PayrollComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
