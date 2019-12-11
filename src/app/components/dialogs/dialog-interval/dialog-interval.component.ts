import { Component, OnInit, Inject } from '@angular/core';
import { TaskDto } from 'src/app/models/Dtos/task.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IntervalsService } from 'src/app/services/intervals.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-dialog-interval',
  templateUrl: './dialog-interval.component.html',
  styleUrls: ['./dialog-interval.component.scss']
})
export class DialogIntervalComponent implements OnInit {

  task: TaskDto;
  taskName: string;
  projectName: string;
  descriptionText: string;
  firstInterval: Date;
  secondInterval: Date;
  comment: string;
  constructor(public dialogRef: MatDialogRef<DialogIntervalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private intervalService: IntervalsService,private taskService:TasksService) { }

  ngOnInit() {
    // this.taskService.getTask().subscribe(t=>{
      
    // })
  }

}
