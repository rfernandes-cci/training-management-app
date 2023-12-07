import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable } from 'rxjs';
import { BatchTechStatusData } from 'src/app/shared/interfaces/BatchData/batch-tech-data';

@Injectable({
  providedIn: 'root'
})
export class BatchStatusService {

  constructor(private http: HttpClient) { }

  getAllStatus():Observable<BatchTechStatusData> {
    const url = Constants.GetBatchStatus;
    return this.http.get<BatchTechStatusData>(url)
  }
}
