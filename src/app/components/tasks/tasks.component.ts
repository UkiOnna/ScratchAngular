import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserWorkOnTheTaskDto } from 'src/app/models/Dtos/userWorkOnTheTask.model';
import { UserWorkOnTheTaskViewModel } from 'src/app/models/Views/userWorkOnTheTaskView.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  projectName: string = "Задачи проекта";
  displayedColumns: string[] = ['id', 'creatorName', 'taskName', 'deadline', 'todayWorkTime', 'allWorkTime', 'taskStatus'];

  @Input() tasks: UserWorkOnTheTaskDto[] = [];

  tasksViews: UserWorkOnTheTaskViewModel[] = [];
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor() { }

  ngOnInit() {
  }
}
