import { Component, OnInit } from '@angular/core';
import { TaskPersonStatisticViewModel } from 'src/app/models/taskPersonStatisticView.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { IntervalsService } from 'src/app/services/intervals.service';
import { UserDto } from 'src/app/models/user.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal-statistic',
  templateUrl: './personal-statistic.component.html',
  styleUrls: ['./personal-statistic.component.scss']
})
export class PersonalStatisticComponent implements OnInit {

  user: UserDto;
  tasks: TaskPersonStatisticViewModel[] = [];
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor(private tasksService: TasksService,
    private intervalsService: IntervalsService,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    let indexDate: Date = this.startDate.value;
    while (indexDate <= this.endDate.value) {
    }
  }

}
