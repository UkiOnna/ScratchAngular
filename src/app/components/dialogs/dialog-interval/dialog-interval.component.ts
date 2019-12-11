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
  public firstInterval: string;
  public secondInterval: string;
  public comment: string;
  isError: boolean;
  constructor(public dialogRef: MatDialogRef<DialogIntervalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private intervalService: IntervalsService, private taskService: TasksService,
    private projectService: ProjectsService) { }

  ngOnInit() {
    this.taskService.getTask(this.data['id']).subscribe(t => {
      this.taskName = t.title;
      this.descriptionText = t.description;
      this.projectService.getTaskProject(t.id).subscribe(p => {
        this.projectName = p.title;
      });
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (!!this.firstInterval && this.secondInterval && this.comment) {
      let firstDate = new Date();
      let secondDate = new Date();
      let firstIntervals = this.firstInterval.split(':');
  
      firstDate.setHours(Number.parseInt(firstIntervals[0]));
      firstDate.setMinutes(Number.parseInt(firstIntervals[1]));

      let secondIntervals = this.secondInterval.split(':');
  
      secondDate.setHours(Number.parseInt(secondIntervals[0]));
      secondDate.setMinutes(Number.parseInt(secondIntervals[1]));
      
      this.interval = {
        startDate: firstDate,
        endDate: secondDate,
        taskId: this.data['id'],
        comment: this.comment,
        id: 0
      };
      this.intervalService.addInterval(this.interval).subscribe();
      this.dialogRef.close();
      return;
    }
    this.isError = true;

  }

}
