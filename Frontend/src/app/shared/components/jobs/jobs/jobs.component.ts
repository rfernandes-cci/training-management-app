import { Component, OnInit } from '@angular/core';
import Constants from 'src/app/core/constants/constants';
import { JobsService } from 'src/app/core/services/jobs/jobs.service';
import { JobsData } from '../../../interfaces/JobsData/jobs-data';
import { PaginationMethodsService } from 'src/app/core/services/pagination-methods/pagination-methods.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  pageNo: number = 1;
  currentPage: number = Constants.currentPage;
  totalPages: number = Constants.totalPages;
  totalRecords: number = Constants.totalRecords;
  noOfRecords: number = Constants.noOfRecords;
  storeJobsData: JobsData[] = [];
  selectedOption: string = 'Select Status';
  lastSearchStatus: string = '';

  constructor(private jobsService: JobsService,
              private paginationMethod: PaginationMethodsService) { }

  ngOnInit(): void {
    this.jobsData(this.pageNo, this.noOfRecords);
  }

  jobsData(pageNo: number, noOfRecords: number, selectedStatus?:string) {
    this.jobsService.getJobsData(pageNo, noOfRecords, selectedStatus ).subscribe((data) => {
      this.storeJobsData = data.records;
      this.totalPages = data.totalPages;
      this.totalRecords = data.totalRecords;
      this.currentPage = data.currentPage;
    });
  }

  getStartingRecord(): number {
    return this.paginationMethod.getStartingRecord(this.currentPage, this.noOfRecords);
  }

  getEndingRecord(): number {
    return this.paginationMethod.getEndingRecord(this.currentPage, this.noOfRecords, this.totalRecords)
  }

  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageNo = pageNumber;
      this.jobsData(this.pageNo, this.noOfRecords);
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  searchOnStatus() {
    this.selectedOption == 'Select Status' ? this.lastSearchStatus = '' : this.lastSearchStatus = this.selectedOption;
    this.currentPage = 1;
    this.jobsData(this.currentPage, this.noOfRecords, this.selectedOption);
  }
  

}
