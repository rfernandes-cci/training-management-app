import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Constants from '../../constants/constants';
import { Observable } from 'rxjs';
import { EmployeeDataApiResponse } from 'src/app/shared/interfaces/EmployeeData/employee-data-api-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  employeeData(page: number, noOfRecords?: number, status?: string, name?:string): Observable<EmployeeDataApiResponse> {
    let apiEndpoint: string;

    if(status === Constants.ActiveEmployee) {
      apiEndpoint = Constants.ActiveEmployeeData
    }
    else if(status === Constants.ResignedEmployee) {
      apiEndpoint = Constants.ResignedEmployeeData
    }
    else {
      // Handle the case where status doesn't match any expected values.
      throw new Error('Invalid status: ' + status);
    }
    
    let params = new HttpParams()
                  .set('page', page.toString())

    if (name && name !== '') {
      params = params.set('name', name.toString());
    }

    if(noOfRecords) {
      params = params.set('noOfRecords', noOfRecords.toString());
    }

    return this.http.get<EmployeeDataApiResponse>(apiEndpoint, {params})
  }
  
}
