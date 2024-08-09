import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:5221/WeatherForecast'; // Replace <port> with your actual port

  constructor(private http: HttpClient) {}

  getWeatherForecast(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Weather Data:', data)),
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return of([]); // Handle error gracefully
      })
    );
  }
}
