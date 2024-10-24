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
  selectedPriorityOption: string = 'All';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe(
      response => {
        this.jobs = response;
        this.filterAndSortJobs();
      }
    );
  }

  filterAndSortJobs() {
    let filteredJobs = this.jobs;

    if (this.selectedPriorityOption !== 'All') {
      filteredJobs = this.jobs.filter(job => job.priority === this.selectedPriorityOption);
    }

    this.sortedJobs = this.sortJobs(filteredJobs, this.selectedSortOption);
  }

  sortJobs(jobs: Job[], option: string): Job[] {
    if (option === 'Newest') {
      return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (option === 'Oldest') {
      return jobs.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    } else if (option === 'A-Z') {
      return jobs.sort((a, b) => a.title.localeCompare(b.title));
    }
    return jobs;
  }

  onSortOptionChange(event: any) {
    this.selectedSortOption = event.value;
    this.filterAndSortJobs();
  }

  onPriorityOptionChange(event: any) {
    this.selectedPriorityOption = event.value;
    this.filterAndSortJobs();
  }

  trackByJobId(index: number, job: Job): number {
    return job.id;
  }
}
