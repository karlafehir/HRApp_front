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
    EmployeeProfileComponent
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
    MatFormFieldModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
