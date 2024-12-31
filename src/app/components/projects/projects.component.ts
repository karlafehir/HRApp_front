import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projectModel';
import { ProjectFormDialogComponent } from './project-form-dialog/project-form-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [fadeInAnimation]
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  errorMessage: string = '';
  constructor(private projectService: ProjectService, private dialog: MatDialog) {}

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

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.GetAllProjects();
      }
    });
  }
}
