import { Component, OnInit } from '@angular/core';
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

  constructor(private uploadFileService: UploadFileService) {}

  selectOption(option: string) {
    this.selectedOption = option;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file: File | null = inputElement.files ? inputElement.files[0] : null;
  
    if (file) {
      console.log(file.name);
      this.selectedFile = file;
      this.updateFileName = file.name;
    }
  }

  uploadFile() {
    this.uploadFileService.uploadFile(this.selectedOption, this.selectedFile!)?.subscribe(
      (res) => {
        console.log('upload successful', res)
        this.updateFileName = 'No file chosen...';
        this.selectedFile = null; 
        this.uploadSuccessful = true;
        this.uploadFailed = false;
        this.hideAnimatedDiv();
      },
      (error) => {
        console.log('upload failed', error);
        this.uploadFailed = true;
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
