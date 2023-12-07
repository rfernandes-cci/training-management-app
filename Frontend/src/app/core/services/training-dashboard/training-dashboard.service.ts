import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TrainingDataApiResponse } from 'src/app/shared/interfaces/TrainingData/training-data-api-response';

@Injectable({
  providedIn: 'root'
})
export class TrainingDashboardService {

  constructor(private http: HttpClient) { }

  url:string = Constants.GetTrainingData;

  trainingData(page: number, noOfRecords?: number, name?: string): Observable<TrainingDataApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())

      if (noOfRecords) {
        params = params.set('noOfRecords', noOfRecords.toString());
      }

      if (name) {
        params = params.set('name', name.toString());
      }

    return this.http.get<TrainingDataApiResponse>(this.url, { params })
      .pipe(catchError(this.handleError));
  }
  
  handleError(err: []) {
    if (err instanceof HttpErrorResponse) {
      //server side error
    }
    else {
      
    }
    return throwError(err)
  }
}
