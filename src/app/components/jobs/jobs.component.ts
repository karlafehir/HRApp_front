import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Job } from '../../models/jobModel';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [fadeInAnimation]
})

export class JobsComponent implements OnInit{

  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(){
    this.jobService.getAllJobs().subscribe(
      response => {
        this.jobs = response;
        console.log(this.jobs);
      }
    )
  }
}
