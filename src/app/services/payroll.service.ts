import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payroll } from '../models/payrollModel';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

    private apiUrl = 'http://localhost:5032/api';

    constructor(private http: HttpClient) { }

    getAllPayrolls(): Observable<Payroll[]> {
      return this.http.get<Payroll[]>(`${this.apiUrl}/Payroll/GetAllPayrolls`);
    }
}