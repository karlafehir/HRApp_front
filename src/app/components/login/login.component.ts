import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/Auth.service';
import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation]
})

export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password
    };
  
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        const role = this.authService.getRole();
        const employeeId = this.authService.getEmployeeId();

        if (role === 'Admin' || role === 'Manager') {
          this.router.navigate(['/projects']);
        } else if (role === 'Employee' && employeeId) {
          this.router.navigate([`/employee-profile/${employeeId}`]); 
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
  
}
