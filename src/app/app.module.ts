import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobCardComponent } from './components/jobs/job-card/job-card.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { RecruitmentCardComponent } from './components/recruitment/recruitment-card/recruitment-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from './components/employees/employees.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeProfileComponent } from './components/employees/employee-profile/employee-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { EmployeeFormDialogComponent } from './components/employees/employee-form-dialog/employee-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from './components/departments/departments.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { JobFormDialogComponent } from './components/jobs/job-form-dialog/job-form-dialog.component';
import { DepartmentFormDialogComponent } from './components/departments/department-form-dialog/department-form-dialog.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CandidateFormDialogComponent } from './components/recruitment/candidate-form-dialog/candidate-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    JobsComponent,
    JobCardComponent,
    RecruitmentComponent,
    RecruitmentCardComponent,
    EmployeesComponent,
    EmployeeProfileComponent,
    NavBarComponent,
    PayrollComponent,
    EmployeeFormDialogComponent,
    DepartmentsComponent,
    JobFormDialogComponent,
    DepartmentFormDialogComponent,
    AttendanceComponent,
    LayoutComponent,
    CandidateFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule, 
    MatSelect,
    MatOption
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
