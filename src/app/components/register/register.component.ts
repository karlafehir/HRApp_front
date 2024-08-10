import { AuthService } from './../../services/auth/Auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onRegister() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe(
      response => {
        console.log('Registration successful', response);
      },
      error => {
        console.error('Registration error', error);
      }
    );
  }
}
