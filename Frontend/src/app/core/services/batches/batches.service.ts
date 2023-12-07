import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable} from 'rxjs';
import { BatchDataApiResponse } from 'src/app/shared/interfaces/BatchData/batch-data-api-response';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  constructor(private http: HttpClient) { }

  url: string = Constants.BatchTrainingData;
  
  getBatchData(page: number, noOfRecords?: number, tech?: string, status?: string): Observable<BatchDataApiResponse> {
    let params = new HttpParams()
                  .set('page', page.toString())
                 
    if(noOfRecords) {
      params = params.set('noOfRecords', noOfRecords.toString());
    }             

    if (tech && tech !== 'Select Tech') {
    params = params.set('tech', tech.toString());
    }

    if (status && status !== 'Select Status') {
    params = params.set('status', status.toString());
    }

    return this.http.get<BatchDataApiResponse>(this.url, {params});
  }

  // getAllBatchData(page: number):Observable <BatchDataApiResponse> {
  //   const params = new HttpParams()
  //                 .set('page', page)
  //   return this.http.get<BatchDataApiResponse>(this.url, {params})
  // }


}
