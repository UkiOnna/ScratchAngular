import { Injectable } from '@angular/core';
import { ProjectDto } from '../models/Dtos/project.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private  root = "/api/intervals"
  
  constructor(private http: HttpClient) { }

  public getProject(projectId: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(this.root + "/" + projectId);
  }

  public getProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.root);
  }

  public getUserProjects(userId: number): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.root + "/" + userId);
  }

  public addProject(project: ProjectDto): Observable<any> {
    return this.http.post(this.root, project);
  }

  public updateProject(project: ProjectDto): Observable<any> {
    return this.http.put(this.root, project);
  }
  public deleteProject(projectId: number): Observable<any> {
    return this.http.delete(this.root + "/" + projectId);
  }
}
