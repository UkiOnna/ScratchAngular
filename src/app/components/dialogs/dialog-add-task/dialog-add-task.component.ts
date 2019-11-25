import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectDto } from 'src/app/models/Dtos/project.model';
import { TaskDto } from 'src/app/models/Dtos/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  public name: string;
  public description: string;
  public deadline = new FormControl(new Date());
  userId: number;
  public projects: ProjectDto[] = [];
  selectedProjectId: number;
  task: TaskDto;
  isError: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectsService, private taskService: TasksService) { }

  ngOnInit() {
    this.userId = this.data["userId"];

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  projectChanged(value): void {
    this.selectedProjectId = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.deadline && this.description) {
      this.task.description = this.description;
      this.task.deadline = this.deadline.value;
      this.task.title = this.name;
      this.task.creatorId = this.userId;
      this.taskService.addTask(this.task);
      this.dialogRef.close();
    }
    else {
      this.isError = true;
    }
  }
}
