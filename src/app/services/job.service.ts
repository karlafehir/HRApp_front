import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/jobModel';

@Injectable({
  providedIn: 'root'
})
export class JobService {

    private apiUrl = 'http://localhost:5032';

    constructor(private http: HttpClient) { }

    getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/api/Jobs/GetAllJobs`);
    }

}
