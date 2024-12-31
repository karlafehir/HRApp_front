import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projectModel';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [fadeInAnimation]
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  errorMessage: string = '';
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.GetAllProjects();
  }

  GetAllProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (response) => {
        this.projects = response;
        console.log(this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.errorMessage = 'Failed to load projects. Please try again later.';
      }
    );
  }

}
