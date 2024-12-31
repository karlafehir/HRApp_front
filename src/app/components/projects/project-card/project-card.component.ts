import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/projectModel';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  constructor(private projectService: ProjectService, private snackBar: MatSnackBar) {}

  @Output() statusUpdated = new EventEmitter<void>();
  @Output() projectDeleted = new EventEmitter<number>();

  updateStatus(project: Project): void {
    this.projectService.updateProject(project.id, project).subscribe(
      () => {
        console.log(`Status updated successfully for project ${project.name}`);
        this.statusUpdated.emit();
      },
      (error) => {
        console.error(`Error updating status for project ${project.name}:`, error);
      }
    );
  }

  deleteProject(project: Project): void {
    this.projectService.deleteProject(project.id).subscribe(
      () => {
        console.log(`Project ${project.name} deleted successfully`);
        this.projectDeleted.emit(project.id);
      },
      (error) => {
        console.error(`Error deleting project ${project.name}:`, error);
      }
    );
  }

  viewDetails(project: Project): void {
    console.log(`View details for project ${project.name}`);
    // Implement navigation or modal logic to show project details
  }
}
