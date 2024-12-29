import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/Auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = this.authService.getRole();
    const routePath = route.routeConfig?.path;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    if (role === 'Admin') {
      return true;
    }

    if (role === 'Manager') {
      if (routePath === 'payroll' || routePath === 'departments') {
        this.router.navigate(['/']);
        return false;
      }
    }

    if (role === 'Employee') {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
