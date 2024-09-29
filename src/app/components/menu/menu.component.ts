import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  constructor(private router: Router) {}

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route:'/'  },
    { name: 'Projects', icon: 'folder', route:'/'   },
    { name: 'Jobs', icon: 'work', route:'/jobs' },
    { name: 'Recruitment', icon: 'group_add', route:'/recruitment'   },
    { name: 'Employees', icon: 'people', route:'/employees'   },
    { name: 'Payroll', icon: 'account_balance', route:'/payroll'   },
    { name: 'Reports', icon: 'assessment', route:'/'   },
    { name: 'Attendance', icon: 'card_travel', route:'/'   },
    { name: 'Departments', icon: 'door_back', route:'/'   },
    { name: 'Training', icon: 'auto_stories', route:'/'   },
    { name: 'Budget', icon: 'attach_money', route:'/'   }
  ];

  selectedRoute: string = '/dashboard';

  ngOnInit() {
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
