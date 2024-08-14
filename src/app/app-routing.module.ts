import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
