import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/Auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
        this.router.navigate(['/jobs']);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
  
}
