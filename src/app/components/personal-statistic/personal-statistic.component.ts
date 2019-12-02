import { Component, OnInit } from '@angular/core';
import { TaskPersonStatisticDto } from 'src/app/models/Dtos/taskPersonStatistic.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { IntervalsService } from 'src/app/services/intervals.service';
import { UserDto } from 'src/app/models/Dtos/user.model';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-personal-statistic',
  templateUrl: './personal-statistic.component.html',
  styleUrls: ['./personal-statistic.component.scss']
})
export class PersonalStatisticComponent implements OnInit {

  displayedColumns: string[] = ['id', 'projectName', 'taskName', 'todayWorkTime', 'allWorkTime', 'taskStatus'];

  user: UserDto;
  tasks = new MatTableDataSource([]);
  
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  searchValue = '';

  constructor(private tasksService: TasksService,
    private intervalsService: IntervalsService,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    this.tasksService.getPersonalStatisticTasks(this.user.id, this.startDate.value, this.endDate.value).subscribe(result => {
      this.tasks.data = result;
    });
  }

  updateStartDate(value): void {
    let newDate = new Date(value);
    this.startDate.setValue(newDate);
  }

  updateEndDate(value): void {
    let newDate = new Date(value);
    this.startDate.setValue(newDate);
  }

  applyFilter(filterValue: string) {
    this.tasks.filter = filterValue.trim().toLowerCase();
  }
}
