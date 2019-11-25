import { Component, OnInit } from '@angular/core';
import { TaskPersonStatisticDto } from 'src/app/models/Dtos/taskPersonStatistic.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: TaskPersonStatisticDto[] = [];
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor() { }

  ngOnInit() {
  }

}
