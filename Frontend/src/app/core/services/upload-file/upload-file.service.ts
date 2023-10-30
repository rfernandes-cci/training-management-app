import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Constants from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  
  constructor(private http: HttpClient) { }

  uploadFile(uploadType: string, file: File) {
    let apiEndpoint: string;

    if(uploadType === Constants.TrainingDashboard) {
      apiEndpoint = Constants.ImportTrainingDashboard;
    }

    else if (uploadType === Constants.EmployeeMaster) {
      apiEndpoint = Constants.ImportEmployeeMaster;
    }

    else {
      return;
    }

    const formData = new FormData();
    formData.append('uploadType',uploadType)
    formData.append('file',file)

    return this.http.post(apiEndpoint, formData)

  }
}
