import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { PayrollService } from '../../services/payroll.service';
import { Payroll } from '../../models/payrollModel';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  animations: [fadeInAnimation]
})
export class PayrollComponent implements OnInit {
  payrolls: Payroll[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['name', 'salary', 'bonus', 'isComplete'];

  constructor(private router: Router, private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.getAllPayrolls();
  }

  getAllPayrolls(): void {
    this.payrollService.getAllPayrolls().subscribe((response: Payroll[]) => {
      this.payrolls = response;
      console.log(this.payrolls);
    });
  }

  getFilteredPayrolls(): Payroll[] {
    if (!this.searchText) {
      return this.payrolls;
    }
    return this.payrolls.filter(payroll =>
      (payroll.employee.firstName + ' ' + payroll.employee.lastName).toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
