import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth/Auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  selectedRoute: string = '';
  role: string | null = null;
  filteredMenuItems: any[] = [];

  menuItems = [
    // { name: 'Dashboard', icon: 'dashboard', route: '/' },
    { name: 'Projects', icon: 'folder', route: '/projects' },
    { name: 'Jobs', icon: 'work', route: '/jobs' },
    { name: 'Recruitment', icon: 'group_add', route: '/recruitment' },
    { name: 'Employees', icon: 'people', route: '/employees' },
    { name: 'Payroll', icon: 'account_balance', route: '/payroll' },
    // { name: 'Reports', icon: 'assessment', route: '/' },
    { name: 'Attendance', icon: 'card_travel', route: '/attendance' },
    { name: 'Departments', icon: 'door_back', route: '/departments' },
    // { name: 'Training', icon: 'auto_stories', route: '/' },
    // { name: 'Budget', icon: 'attach_money', route: '/' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.authService.getRole();

    this.filteredMenuItems = this.menuItems.filter(item => {
      if (this.role === 'Admin') {
        return true; 
      }
      if (this.role === 'Manager') {
        return item.name !== 'Payroll' && item.name !== 'Departments';
      }
      return false; 
    });

    this.selectedRoute = this.router.url;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.selectedRoute = event.urlAfterRedirects;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
