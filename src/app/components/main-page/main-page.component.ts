import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user.model';
import { FormControl } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { IntervalsService } from 'src/app/services/intervals.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { TaskViewModel } from 'src/app/models/taskView.model';
import { IntervalCellViewModel } from 'src/app/models/intervalCellView.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user: UserDto;
  taskDate = new FormControl(new Date());
  searchValue = '';

  displayedColumns: string[] = ['id', 'projectName', 'taskName'];
  hoursColumns: string[] = [];
  tasks: TaskViewModel[] = [];

  constructor(private tasksService: TasksService,
    private intervalsService: IntervalsService,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    for (let i = 7; i <= 22; i++) {
      this.displayedColumns.push(i.toString());
      this.hoursColumns.push(i.toString());
    }

    this.tasksService.getUserTasks(this.user.id, this.taskDate.value).subscribe(tasks => {
      this.intervalsService.getUserIntervals(this.user.id).subscribe(intervals => {
        this.projectsService.getUserProjects(this.user.id).subscribe(projects => {
          tasks.forEach(t => {
            let intervalCells = [];

            for (let i = 7; i <= 22; i++) {
              let isWork = false;
              intervals.filter(interval => interval.taskId == t.id).
                forEach(interval => isWork = this.dateIsInRange(i, interval.start, interval.end));
              let intervalCell: IntervalCellViewModel = {
                hour: i,
                isWork: isWork
              }
              intervalCells.push(intervalCell);
            }

            let element: TaskViewModel = {
              id: t.id,
              projectName: projects.find(p => p.id == t.projectId).title,
              taskName: t.title,
              intervalCells: intervalCells
            };
            this.tasks.push(element);
          });
        });
      });
    });
  }

  private dateIsInRange(requiredHour, startDate, endDate): boolean {
    let date = this.taskDate.value;
    date.hour = requiredHour;
    return startDate <= date >= endDate;
  }

  public getNumber(str: string): number {
    return Number.parseInt(str);
  }
}