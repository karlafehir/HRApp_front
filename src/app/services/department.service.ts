import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/jobModel';
import { Candidate } from '../models/candidateModel';
import { Department } from '../models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

    private apiUrl = 'http://localhost:5032';

    constructor(private http: HttpClient) { }

    getAllDepartments(): Observable<Department[]> {
      return this.http.get<Department[]>(`${this.apiUrl}/api/Department/GetDepartments`);
    }

    addDepartment(department: Department): Observable<Department> {
      return this.http.post<Department>(`${this.apiUrl}/api/Department/AddDepartment`, department);
    }

    updateDepartment(department: Department): Observable<Department> {
      return this.http.put<Department>(`${this.apiUrl}/api/Department/UpdateDepartment/${department.id}`, department);
    }

}
