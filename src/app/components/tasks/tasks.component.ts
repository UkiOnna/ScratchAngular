import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserWorkOnTheTaskDto } from 'src/app/models/Dtos/userWorkOnTheTask.model';
import { UserWorkOnTheTaskViewModel } from 'src/app/models/Views/userWorkOnTheTaskView.model';
import { ProjectDto } from 'src/app/models/Dtos/project.model';
import { MatTableDataSource } from '@angular/material';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskFullViewModel } from 'src/app/models/Views/taskFullView.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  project: ProjectDto;

  displayedColumns: string[] = ['id', 'title','deadline','creatorName','executorName'];
  tasks = new MatTableDataSource([]);
  searchValue = '';

  constructor(private tasksService: TasksService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProject(this.route.snapshot.params.id).subscribe(p => {
      this.project = p;

      this.tasksService.getProjectTasks(this.project.id).subscribe(result => {
        this.tasks.data = [];
        result.forEach(r => {
          this.usersService.getUser(r.creatorId).subscribe(cu => {
            this.usersService.getUser(r.executorId).subscribe(eu => {
              let task: TaskFullViewModel = {
                id: r.id,
                title: r.title,
                deadline: r.deadline,
                creatorName: cu.lastName + cu.firstName,
                executorName: eu.lastName + eu.firstName
              };
              this.tasks.data.push(task);
            });
          });
        });
      });
    });
  }

  applyFilter(filterValue: string) {
    this.tasks.filter = filterValue.trim().toLowerCase();
  }
}
