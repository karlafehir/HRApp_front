import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    private apiUrl = 'http://localhost:5032/api/projects';

    constructor(private http: HttpClient) { }

    getAllProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}/GetAllProjects`);
    }

    getProjectById(projectId: number): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/GetProjectById/${projectId}`);
    }

    addProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${this.apiUrl}/AddProject`, project);
    }

    updateProject(projectId: number, project: Project): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/UpdateProject/${projectId}`, project);
    }

    deleteProject(projectId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/DeleteProject/${projectId}`);
    }
}
