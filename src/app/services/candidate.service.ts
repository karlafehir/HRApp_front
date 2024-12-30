import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidateModel';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

    private apiUrl = 'http://localhost:5032';

    constructor(private http: HttpClient) { }

    getAllCandidates(): Observable<Candidate[]> {
      return this.http.get<Candidate[]>(`${this.apiUrl}/api/Candidates/GetCandidates`);
    }

    getCandidateById(id: number): Observable<Candidate> {
      return this.http.get<Candidate>(`${this.apiUrl}/api/Candidates/GetCandidateById/${id}`);
    }

    addCandidate(candidate: Candidate): Observable<Candidate> {
      return this.http.post<Candidate>(`${this.apiUrl}/api/Candidates/AddCandidate`, candidate);
    }

    updateCandidate(candidate: Candidate): Observable<Candidate> {
      return this.http.put<Candidate>(`${this.apiUrl}/api/Candidates/UpdateCandidate/${candidate.id}`, candidate);
    }
    
    deleteCandidate(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/api/Candidates/DeleteCandidate/${id}`);
    }

    addCandidateWithFile(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/Candidates/AddCandidateWithFile`, formData);
    }
    
    updateCandidateWithFile(formData: FormData): Observable<any> {
      return this.http.put(`${this.apiUrl}/api/Candidates/UpdateCandidateWithFile/${formData.get('id')}`, formData);
    }
    
}
