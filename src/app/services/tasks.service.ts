import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskDto } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private  root = "/api/tasks"
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

  public getUserTasks(userId: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.root + "/user-tasks/" + userId);
  }
}