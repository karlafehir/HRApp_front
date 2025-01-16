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
    { name: 'Projekti', icon: 'folder', route: '/projects' },
    { name: 'Poslovi', icon: 'work', route: '/jobs' },
    { name: 'Zapošljavanje', icon: 'group_add', route: '/recruitment' },
    { name: 'Zaposlenici', icon: 'people', route: '/employees' },
    { name: 'Plaće', icon: 'account_balance', route: '/payroll' },
    // { name: 'Reports', icon: 'assessment', route: '/' },
    { name: 'Odsustva', icon: 'card_travel', route: '/attendance' },
    { name: 'Odjeli', icon: 'door_back', route: '/departments' },
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
        return item.name !== 'Plaće' && item.name !== 'Odjeli' && item.name !== 'Odsustva';
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
