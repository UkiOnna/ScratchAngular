import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '../models/Dtos/task.model';
import { TaskPersonStatisticDto } from '../models/Dtos/taskPersonStatistic.model';
import { UserWorkOnTheTaskDto } from '../models/Dtos/userWorkOnTheTask.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private root = "/api/tasks"
  constructor(private http: HttpClient) { }

  public getTask(taskId: number): Observable<TaskDto> {
    return this.http.get<TaskDto>(this.root + "/" + taskId);
  }

  public addTask(task: TaskDto): Observable<any> {
    return this.http.post(this.root, task);
  }

  public deleteTask(taskId: number): Observable<any> {
    return this.http.delete(this.root + "/" + taskId);
  }

  public updateTask(task: TaskDto): Observable<any> {
    return this.http.put(this.root + '/' + task.id, task);
  }

  public getUserTasks(userId: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.root + "/user-tasks/" + userId);
  }

  public getUserTasksByDate(userId: number, date: Date): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.root + "/user-tasks/" + userId + '/' + date.toDateString());
  }

  public getPersonalStatisticTasks(userId: number, startDate: Date, endDate: Date): Observable<TaskPersonStatisticDto[]> {
    return this.http.get<TaskPersonStatisticDto[]>(this.root + "/personal-statistics/" + userId + "/" + startDate.toDateString() + "/" + endDate.toDateString());
  }

  public getProjectUserWorkOnTheTasks(projectId: number, startDate: Date, endDate: Date): Observable<UserWorkOnTheTaskDto[]> {
    return this.http.get<UserWorkOnTheTaskDto[]>(this.root + "/project/" + projectId + "/" + startDate + "/" + endDate);
  }

  public getProjectTasks(projectId: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.root + "/project/" + projectId);
  }
}
