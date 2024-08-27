import { Component, Input } from '@angular/core';
import { Candidate } from '../../../models/candidateModel';

@Component({
  selector: 'app-recruitment-card',
  templateUrl: './recruitment-card.component.html',
  styleUrls: ['./recruitment-card.component.scss']
})

export class RecruitmentCardComponent {
  @Input() candidate! : Candidate;
}
