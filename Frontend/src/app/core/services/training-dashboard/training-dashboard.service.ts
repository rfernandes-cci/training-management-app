import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable, map } from 'rxjs';
import { TrainingDataApiResponse } from 'src/app/shared/interfaces/TrainingData/training-data-api-response';

@Injectable({
  providedIn: 'root'
})
export class TrainingDashboardService {

  constructor(private http: HttpClient) { }

  trainingData(): Observable<TrainingDataApiResponse> {
    const url = Constants.GetTrainingData;
    return this.http.get<TrainingDataApiResponse>(url);
  }
}
