import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectDto } from 'src/app/models/project.model';
import { TaskDto } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  public name: string;
  public description: string;
  public deadline: Date;
  userId: number;
  public projects: ProjectDto[] = [];
  selectedProjectId:number;
  task:TaskDto;
  isError:boolean=false;
  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectsService,private taskService:TasksService) { }

  ngOnInit() {
    this.userId = this.data["userId"];
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  cahngeDate(value): void {
    this.deadline = value;
  }

  projectChanged(value):void{
    this.selectedProjectId=value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.deadline && this.description && this.selectedProjectId) {
      this.task.description=this.description;
      this.task.deadline=this.deadline;
      this.task.title=this.name;
      this.task.creatorId=this.userId;
      this.taskService.addTask(this.task);
      this.dialogRef.close();
    }
    else{
      this.isError=true;
    }
  }
}
