import { Component, OnInit, Inject } from '@angular/core';
import { TaskDto } from 'src/app/models/Dtos/task.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IntervalsService } from 'src/app/services/intervals.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { IntervalDto } from 'src/app/models/Dtos/interval.model';

@Component({
  selector: 'app-dialog-interval',
  templateUrl: './dialog-interval.component.html',
  styleUrls: ['./dialog-interval.component.scss']
})
export class DialogIntervalComponent implements OnInit {
  interval: IntervalDto;
  taskId: number;
  public taskName: string = "";
  public projectName: string = "";
  public descriptionText: string = "";
  public firstInterval: Date;
  public secondInterval: Date;
  public comment: string;
  isError: boolean;
  constructor(public dialogRef: MatDialogRef<DialogIntervalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private intervalService: IntervalsService, private taskService: TasksService,
    private projectService: ProjectsService) { }

  ngOnInit() {
    this.taskService.getTask(this.data['id']).subscribe(t => {
      this.taskName = t.title;
      this.descriptionText = t.description;
      this.projectService.getTaskProjects(t.id).subscribe(p => {
        this.projectName = p.title;
      });
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (!!this.firstInterval && this.secondInterval && this.comment) {
      this.interval = {
        start: this.firstInterval,
        end: this.secondInterval,
        taskId: this.data['id'],
        comment: this.comment,
        id: 0
      };
      this.intervalService.updateInterval(this.interval).subscribe();
      this.dialogRef.close();
      return;
    }
    this.isError = true;

  }

}
