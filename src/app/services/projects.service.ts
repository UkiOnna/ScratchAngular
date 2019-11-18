import { Injectable } from '@angular/core';
import { ProjectDto } from '../models/project.model';
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
}
