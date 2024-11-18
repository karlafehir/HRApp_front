import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/Auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {

  constructor(private authService: AuthService) {}

  onLogout(){
    this.authService.logout();
  }
}
