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
import { AuthGuard } from './guards/auth.guard';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'recruitment',
    component: RecruitmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-profile/:id',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payroll',
    component: PayrollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: '**', redirectTo: '/jobs' }, // Wildcard route for unknown paths

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
