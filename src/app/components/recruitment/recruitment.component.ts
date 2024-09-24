import { Component } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Candidate } from '../../models/candidateModel';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/jobModel';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss'],
  animations: [fadeInAnimation]
})

export class RecruitmentComponent {

  recruitmentStatuses: any[] = [
    { status: 'New Applied'},
    { status: 'Interview'},
    { status: 'Hired'}
  ];

  candidates: Candidate[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.GetJobByIdWithCandidates();
  }

  GetJobByIdWithCandidates(){
    this.jobService.getJobByIdWithCandidates(3).subscribe(
      (response: Job) => {
        this.candidates = response.candidates;
        console.log(this.candidates);
      },
      error => {
        console.error('Error fetching candidates:', error);
      }
    );
  }


}
