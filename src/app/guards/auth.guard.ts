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
      if (routePath === 'jobs') {
        return true; 
      }
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
      return true;
    }

    if (role === 'Employee') {
      const employeeId = this.authService.getEmployeeId();
      if (routePath === 'jobs') {
        this.router.navigate([`/employee-profile/${employeeId}`]); 
        return false;
      }
      if (employeeId && !routePath?.includes('employee-profile')) {
        this.router.navigate([`/employee-profile/${employeeId}`]);
        return false;
      }
      return true;
    }

    return true;
  }
}
