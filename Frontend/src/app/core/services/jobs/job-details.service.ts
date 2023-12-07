import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Constants from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsService {

  url: string = Constants.GetJobData;

  constructor(private http: HttpClient) { }

  getJobDetails(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${jobId}`);
  }
}
