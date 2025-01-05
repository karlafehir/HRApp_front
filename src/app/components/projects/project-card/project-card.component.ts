import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../models/projectModel';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  @Output() statusUpdated = new EventEmitter<void>();
  @Output() projectDeleted = new EventEmitter<number>();

  get timeLeft(): number {
    const now = new Date();
    const endDate = new Date(this.project.endDate);
    const diffInMs = endDate.getTime() - now.getTime();
    const weeksLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7)); // Convert ms to weeks
    return weeksLeft > 0 ? weeksLeft : 0; // Return 0 if the project has ended
  }

  get progressPercentage(): number {
    const startDate = new Date(this.project.startDate).getTime();
    const endDate = new Date(this.project.endDate).getTime();
    const now = new Date().getTime();

    if (now >= endDate) {
      return 100; // Project completed
    } else if (now <= startDate) {
      return 0; // Project not started
    } else {
      return Math.round(((now - startDate) / (endDate - startDate)) * 100);
    }
  }

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

  openProjectDetails(): void {
    const dialogRef = this.dialog.open(ProjectDetailsDialogComponent, {
      width: '500px',
      data: this.project
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
