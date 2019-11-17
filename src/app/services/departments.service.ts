import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentDto } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private  root = "/api/departments"
  constructor(private http: HttpClient) { }

  public getDepartment(departmentId: number): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(this.root + "/" + departmentId);
  }

  public getSubdivisionDepartments(subdivisionId: number): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(this.root + "/subdivision-departments/" + subdivisionId);
  }

  public addDepartment(department: DepartmentDto): Observable<any> {
    return this.http.post(this.root, department);
  }

  public updateDepartment(department: DepartmentDto): Observable<any> {
    return this.http.put(this.root, department);
  }
}
