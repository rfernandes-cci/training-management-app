import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable } from 'rxjs';
import { JobsDataApiResponse } from 'src/app/shared/interfaces/JobsData/jobs-data-api-response';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  url: string = Constants.GetJobData

  getJobsData(pageNo: number, noOfRecords: number, status?: string): Observable<JobsDataApiResponse> {
    let params = new HttpParams()
      .set('noOfRecords', noOfRecords.toString())

      if (status) {
        params = params.set('status', status.toString())
      }
      
    return this.http.get<JobsDataApiResponse>(`${this.url}/${pageNo}`, { params });
  }
  
}
