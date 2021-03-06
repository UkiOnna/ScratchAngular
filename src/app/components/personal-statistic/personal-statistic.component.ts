import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskPersonStatisticDto } from 'src/app/models/Dtos/taskPersonStatistic.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { IntervalsService } from 'src/app/services/intervals.service';
import { UserDto } from 'src/app/models/Dtos/user.model';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenDto } from 'src/app/models/Dtos/token.model';

@Component({
  selector: 'app-personal-statistic',
  templateUrl: './personal-statistic.component.html',
  styleUrls: ['./personal-statistic.component.scss']
})
export class PersonalStatisticComponent implements OnInit {

  displayedColumns: string[] = ['id', 'projectName', 'taskName', 'todayWorkTime', 'allWorkTime', 'taskStatus'];

  user: UserDto;
  tasks = new MatTableDataSource([]);
  public token: TokenDto;

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date("2020-01-05T09:05:05.035Z"));
  searchValue = '';

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(private tasksService: TasksService,
    private intervalsService: IntervalsService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private cookieService: CookieService) { }

  ngOnInit() {
    let cookieValue = this.cookieService.get("token");
    this.token = { token: cookieValue };
    this.usersService.getUserByToken(this.token).subscribe(result => {
      this.user = result;
      let date = this.endDate.value.toDateString();
      this.tasksService.getPersonalStatisticTasks(this.user.id, this.startDate.value, this.endDate.value).subscribe(result => {
        this.tasks.data = result;
      });
    });

    this.tasks.paginator = this.paginator;
  }

  updateStartDate(value): void {
    let newDate = new Date(value);
    this.startDate.setValue(newDate);
    this.tasksService.getPersonalStatisticTasks(this.user.id, this.startDate.value, this.endDate.value).subscribe(result => {
      this.tasks.data = result;
    });
  }

  updateEndDate(value): void {
    let newDate = new Date(value);
    this.endDate.setValue(newDate);
    this.tasksService.getPersonalStatisticTasks(this.user.id, this.startDate.value, this.endDate.value).subscribe(result => {
      this.tasks.data = result;
    });
  }

  applyFilter(filterValue: string) {
    this.tasks.filter = filterValue.trim().toLowerCase();
  }
}
