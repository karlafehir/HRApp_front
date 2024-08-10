import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  menuItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Projects', icon: 'folder' },
    { name: 'Jobs', icon: 'work' },
    { name: 'Recruitment', icon: 'group_add' },
    { name: 'Employees', icon: 'people' },
    { name: 'Payroll', icon: 'account_balance' },
    { name: 'Reports', icon: 'assessment' }
  ];
  
}
