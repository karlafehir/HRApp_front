import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  constructor(private router: Router) {}

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route:'/'  },
    { name: 'Projects', icon: 'folder', route:'/'   },
    { name: 'Jobs', icon: 'work', route:'/jobs' },
    { name: 'Recruitment', icon: 'group_add', route:'/recruitment'   },
    { name: 'Employees', icon: 'people', route:'/'   },
    { name: 'Payroll', icon: 'account_balance', route:'/'   },
    { name: 'Reports', icon: 'assessment', route:'/'   }
  ];

  selectedRoute: string = '/dashboard'; // Default selected route

  navigateTo(route: string) {
    this.selectedRoute = route; // Update selected route
    this.router.navigate([route]);
  }

}
