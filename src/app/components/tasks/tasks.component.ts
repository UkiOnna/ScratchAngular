import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserWorkOnTheTaskDto } from 'src/app/models/Dtos/userWorkOnTheTask.model';
import { UserWorkOnTheTaskViewModel } from 'src/app/models/Views/userWorkOnTheTaskView.model';
import { ProjectDto } from 'src/app/models/Dtos/project.model';
import { MatTableDataSource } from '@angular/material';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskFullViewModel } from 'src/app/models/Views/taskFullView.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() project: ProjectDto;

  displayedColumns: string[] = ['id', 'name'];
  tasks = new MatTableDataSource([]);
  searchValue = '';

  constructor(private tasksService: TasksService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.tasksService.getProjectTasks(this.project.id).subscribe(result => {
      this.tasks.data = [];
      result.forEach(r => {
        this.usersService.getUser(r.creator_id).subscribe(cu => {
          this.usersService.getUser(r.executor_id).subscribe(eu => {
            let task: TaskFullViewModel = {
              id: r.id,
              title: r.title,
              deadline: r.deadline,
              creatorName: cu.lastname + cu.firstname,
              executorName: eu.lastname + eu.firstname
            };
            this.tasks.data.push(task);
          });
        });
      });
    });
  }

  applyFilter(filterValue: string) {
    this.tasks.filter = filterValue.trim().toLowerCase();
  }
}
