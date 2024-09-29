import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    private apiUrl = 'http://localhost:5032';

    constructor(private http: HttpClient) { }

    getAllEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiUrl}/api/Employees/GetAllEmployees`);
    }

    getEmployeeById(id: number): Observable<Employee>{
      return this.http.get<Employee>(`${this.apiUrl}/api/Employees/GetEmployeeById/${id}`);
    }

    addEmployee(employee: Employee): Observable<Employee> {
      return this.http.post<Employee>(`${this.apiUrl}/api/Employees/AddEmployee`, employee);
    }

    updateEmployee(employee: Employee): Observable<Employee> {
      return this.http.put<Employee>(`${this.apiUrl}/api/Employees/UpdateEmployee/${employee.id}`, employee);
    }
    
}
