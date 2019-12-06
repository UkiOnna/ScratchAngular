import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import { ProjectDto } from 'src/app/models/Dtos/project.model';
import { TaskDto } from 'src/app/models/Dtos/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { FormControl } from '@angular/forms';
import { UserDto } from 'src/app/models/Dtos/user.model';
import { UsersService } from 'src/app/services/users.service';

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
  selecetedExecutorId: number;
  public projects: ProjectDto[] = [];
  public tasks: TaskDto[] = [];
  public executors: UserDto[] = [];
  selecetdProjectName: string;
  selectedExecutorName: string;
  selectedProjectId: number;
  selectedTaskId: number;
  task: TaskDto;
  isError: boolean = false;
  isEdit: boolean = false;
  isTaskChoosed: boolean = true;
  isDeleted: boolean = false;
  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectsService, private taskService: TasksService, private userSevice: UsersService) { }

  ngOnInit() {
    this.userId = this.data["userId"];
    this.isEdit = this.data["isEdit"];
    this.isDeleted = this.data["isDeleted"];
    if (this.isEdit || this.isDeleted) {
      this.isTaskChoosed = false;
      this.taskService.getUserTasks(this.userId, null).subscribe(ts => {
        this.tasks = ts;
      });
    }
    this.userSevice.getUsers().subscribe(u => {
      this.executors = u;
    });
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  projectChanged(value): void {
    this.selectedProjectId = value;
  }

  taskChaged(value): void {
    this.taskService.getTask(value).subscribe(task => {
      this.name = task.title;
      this.deadline.setValue(task.deadline);
      this.description = task.description;
      this.selecetedExecutorId = task.executor_id;
      this.selectedProjectId = task.project_id;
    });
    this.projectService.getProject(this.selectedProjectId).subscribe(proj => {
      this.selecetdProjectName = proj.title;
    });
    this.userSevice.getUser(this.selecetedExecutorId).subscribe(user => {
      this.selectedExecutorName = user.firstname;
    });
    this.selectedTaskId = value;
    this.isTaskChoosed = true;
  }

  updateDate(value): void {
    let newDate = new Date(value);
    this.deadline.setValue(newDate);
  }

  executorChanged(value): void {
    this.selecetedExecutorId = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.selectedTaskId && this.isDeleted) {
      this.taskService.deleteTask(this.selectedTaskId).subscribe();
      this.dialogRef.close();
      return;
    }
    if (!!this.name && this.deadline && this.description && this.selectedProjectId && this.selecetedExecutorId) {
      this.task = {
        description: this.description,
        deadline: this.deadline.value,
        title: this.name,
        creator_id: this.userId,
        project_id: this.selectedProjectId,
        id: null,
        executor_id: this.selecetedExecutorId
      };
      if (this.selectedTaskId) {
        this.taskService.updateTask(this.task).subscribe();
        this.dialogRef.close();
        return;
      }
      this.taskService.addTask(this.task).subscribe();
      this.dialogRef.close();
      return;
    }
    this.isError = true;

  }
}
