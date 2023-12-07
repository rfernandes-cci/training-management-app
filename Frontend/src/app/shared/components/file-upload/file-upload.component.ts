import { Component, OnInit } from '@angular/core';
import { Observable, Subject, observable } from 'rxjs';
import { UploadFileService } from 'src/app/core/services/upload-file/upload-file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedOption: string = 'Training Dashboard';
  selectedFile: File | null = null; // Variable to store file
  updateFileName: string = 'No file chosen...';
  uploadSuccessful: boolean = false;
  uploadFailed: boolean = false;
  uploadError: string = '';
  uploadSuccess: boolean = false;

  constructor(private uploadFileService: UploadFileService) {}

  selectOption(option: string) {
    this.selectedOption = option;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file: File | null = inputElement.files ? inputElement.files[0] : null;
  
    if (file) {
      if(file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        this.selectedFile = file;
        this.updateFileName = file.name;
        this.uploadFailed = false;
        this.uploadError = '';
        this.uploadSuccess = true
      }
      else {
        this.uploadFailed = true;
      }
    }
  }

  uploadFile() {
    this.uploadFileService.uploadFile(this.selectedOption, this.selectedFile!)?.subscribe(
      (res) => {
        this.updateFileName = 'No file chosen...';
        this.selectedFile = null; 
        this.uploadSuccessful = true;
        this.uploadError = '';
        this.hideAnimatedDiv();
      },
      (error) => {
        this.uploadError = error.message;
        this.uploadSuccessful = false;
       this.hideAnimatedDiv();
      }
    )
  }

  hideAnimatedDiv() {
    setTimeout(() => {
      this.uploadSuccessful = false;
    }, 3000);
  }

  ngOnInit(): void {
  }

}
