import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['jobs']);
  }

  onLogin() {
    this.router.navigate(['/login']); 
  }
}
