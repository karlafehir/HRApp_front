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
      return this.http.get<Employee[]>(`${this.apiUrl}/api/Employee/GetAllEmployees`);
    }

    GetEmployeesWithRoles(roleName?: string): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiUrl}/api/Employee/GetEmployeesWithRoles?roleName=${roleName}`);
    }


    getEmployeeById(id: number): Observable<Employee>{
      return this.http.get<Employee>(`${this.apiUrl}/api/Employee/GetEmployeeById/${id}`);
    }

    deleteEmployee(id: number): Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/api/Employee/DeleteEmployee/${id}`);
    }

    addEmployee(employee: Employee): Observable<Employee> {
      return this.http.post<Employee>(`${this.apiUrl}/api/Employee/AddEmployee`, employee);
    }

    updateEmployee(employee: Employee): Observable<Employee> {
      return this.http.put<Employee>(`${this.apiUrl}/api/Employee/UpdateEmployee/${employee.id}`, employee);
    }

    assignRole(email: string, role: string): Observable<any> {
      const url = `${this.apiUrl}/api/Roles/AssignRole?email=${email}&newRole=${role}`;
      return this.http.post(url, null); 
    }
    
}
