import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Project } from '../../../models/projectModel';
import { Employee } from '../../../models/employeeModel';
import { ProjectService } from '../../../services/project.service';
import { ProjectFormDialogComponent } from '../project-form-dialog/project-form-dialog.component';

@Component({
  selector: 'app-project-details-dialog',
  templateUrl: './project-details-dialog.component.html',
  styleUrls: ['./project-details-dialog.component.scss']
})
export class ProjectDetailsDialogComponent implements OnInit {
  employees: Employee[] = []; 

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.projectService.getEmployeesByProjectId(this.project.id).subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  editProject(): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      width: '400px',
      data: this.project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(true); 
      }
    });
  }

  deleteProject(): void {
    if (confirm(`Are you sure you want to delete the project "${this.project.name}"?`)) {
      this.projectService.deleteProject(this.project.id).subscribe(
        () => {
          console.log(`Project "${this.project.name}" deleted successfully.`);
          this.dialogRef.close(true); 
        },
        error => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
}
