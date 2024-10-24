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

    getJobByIdWithCandidates(id: number): Observable<Job> {
      return this.http.get<Job>(`${this.apiUrl}/api/Jobs/GetJobByIdWithCandidates/${id}`);
    }

    addJob(job: Job): Observable<Job> {
      return this.http.post<Job>(`${this.apiUrl}/api/Jobs/AddJob`, job);
    }

    updateJob(job: Job): Observable<Job> {
      return this.http.put<Job>(`${this.apiUrl}/api/Jobs/UpdateJob/${job.id}`, job);
    }
}
