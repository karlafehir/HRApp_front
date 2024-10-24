import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Job } from '../../models/jobModel';
import { JobService } from '../../services/job.service';
import { MatDialog } from '@angular/material/dialog';
import { JobFormDialogComponent } from './job-form-dialog/job-form-dialog.component';

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

  constructor(private jobService: JobService, private dialog: MatDialog) {}

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

  trackByJobId(index: number, job: Job) {
    return job.id;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.getAllJobs();
      }
    });
  }
}
