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
  sortedJobs: Job[] = [];
  selectedSortOption: string = 'Newest';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(){
    this.jobService.getAllJobs().subscribe(
      response => {
        this.jobs = response;
        this.sortJobs(this.selectedSortOption);
      }
    )
  }

  sortJobs(option: string) {
    if (option === 'Newest') {
      this.sortedJobs = this.jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (option === 'Oldest') {
      this.sortedJobs = this.jobs.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    } else if (option === 'A-Z') {
      this.sortedJobs = this.jobs.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  onSortOptionChange(event: any) {
    this.selectedSortOption = event.value;
    this.sortJobs(this.selectedSortOption);
  }

  trackByJobId(index: number, job: Job): number {
    return job.id;
  }
}
