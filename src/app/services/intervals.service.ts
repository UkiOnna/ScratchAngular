import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntervalDto } from '../models/interval.model';

@Injectable({
  providedIn: 'root'
})
export class IntervalsService {

  private  root = "/api/intervals"
  constructor(private http: HttpClient) { }

  public getInterval(intervalId: number): Observable<IntervalDto> {
    return this.http.get<IntervalDto>(this.root + "/" + intervalId);
  }
  
  public addInterval(interval: IntervalDto): Observable<any> {
    return this.http.post(this.root, interval);
  }

  public getTaskIntervals(taskId: number): Observable<IntervalDto[]> {
    return this.http.get<IntervalDto[]>(this.root + "/task-intervals/" + taskId);
  }
}
