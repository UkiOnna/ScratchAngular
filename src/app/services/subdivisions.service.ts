import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubdivisionDto } from '../models/Dtos/subdivision.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionsService {

  private root = "/api/subdivisions"
  constructor(private http: HttpClient) { }

  public getSubdivison(subdivisionId: number): Observable<SubdivisionDto> {
    return this.http.get<SubdivisionDto>(this.root + "/" + subdivisionId);
  }

  public getSubdivisions(): Observable<SubdivisionDto[]> {
    return this.http.get<SubdivisionDto[]>(this.root);
  }

  public addSubdivision(subdivision: SubdivisionDto): Observable<any> {
    return this.http.post(this.root, SubdivisionDto);
  }

  public updateSubdivision(subdivision: SubdivisionDto): Observable<any> {
    return this.http.put(this.root + "/" + subdivision.id, subdivision);
  }
  public deleteSubdivision(subdivisionId: number): Observable<any> {
    return this.http.delete(this.root + "/" + subdivisionId);
  }
}
