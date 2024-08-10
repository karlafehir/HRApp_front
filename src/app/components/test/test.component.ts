import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/TestService.service';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

  weatherData: WeatherForecast[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getWeatherForecast().subscribe(data => {
      this.weatherData = data;
      console.log('Component Weather Data:', data); 
    });
  }
  
}
