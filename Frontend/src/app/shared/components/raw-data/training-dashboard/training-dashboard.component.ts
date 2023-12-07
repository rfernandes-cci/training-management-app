import { Component, OnInit } from '@angular/core';
import Constants from 'src/app/core/constants/constants';
import { PaginationMethodsService } from 'src/app/core/services/pagination-methods/pagination-methods.service';
import { TrainingDashboardService } from 'src/app/core/services/training-dashboard/training-dashboard.service';
import { TrainingDataCheckboxService } from 'src/app/core/services/saved-checkboxes/training-data-checkbox.service';
import { CheckboxDetails } from 'src/app/shared/interfaces/Checkbox/checkbox-details';
import { TrainingData } from 'src/app/shared/interfaces/TrainingData/training-data';
import { ExcelExportService } from 'src/app/core/services/excel-export/excel-export.service';
import { switchMap, map, take } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.scss']
})
export class TrainingDashboardComponent implements OnInit {
  
   trainingData: TrainingData[] = [];
   currentPage: number = Constants.currentPage;
   totalPages: number = Constants.totalPages;
   totalRecords: number = Constants.totalRecords;
   noOfRecords: number = Constants.noOfRecords;
   pageNo: number = Constants.pageZero;
   checkboxes: CheckboxDetails[] = [
    { label: 'Training End Date', field: 'trainingEndDate', checked: false },
    { label: 'Resource Type', field: 'resourceType', checked: false },
    { label: 'Employee Status', field: 'employeeStatus', checked: false },
    { label: 'Is Processed', field: 'isProcessed', checked: false },
    { label: 'Updated At', field: 'updatedAt', checked: false }
  ];
   isCollapsed: boolean = false;
  errBlock: boolean = false;
  errTxt: string = '';
  searchQuery: string = '';
  lastSearchQuery: string = '';
  trainingAllData: TrainingData[] = []
  

  constructor(private trainingDashboard: TrainingDashboardService, 
              private trainingDataCheckboxService:TrainingDataCheckboxService,
              private paginationMethod: PaginationMethodsService,
              private excelExportService: ExcelExportService) { }

  ngOnInit(): void {
    this.getTrainingData(this.currentPage, this.noOfRecords);
    this.getAllTrainingData(this.pageNo);
   
    // Get the saved checkboxes from localStorage
    const getSavedCheckboxes = this.trainingDataCheckboxService.getCheckboxState();

    // Update the checkboxes array if there are saved values
    if (getSavedCheckboxes.length > 0) {
      this.checkboxes = getSavedCheckboxes;
    }
  }

  onCheckboxChange(data:string, isChk:boolean) {
   const checkbox = this.checkboxes.find(cb => cb.field === data)

   if(checkbox) {
    checkbox.checked = isChk;
    this.trainingDataCheckboxService.saveCheckboxState(this.checkboxes);
   }

  }

  getCheckboxState(field: string): boolean {
    const checkbox = this.checkboxes.find(cb => cb.field === field);
    return checkbox ? checkbox.checked : false;
  }

  resetToDefault() {
    for (const checkbox of this.checkboxes) {
      checkbox.checked = false;
    }

    this.trainingDataCheckboxService.saveCheckboxState([]);
  }

  getTrainingData(page: number, noOfRecords?: number, name?: string ) {
    this.trainingDashboard.trainingData(page, noOfRecords, name).subscribe((data) => {
      this.trainingData = data.records;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.totalRecords = data.totalRecords;
      console.log(data)
    }, error => {
      this.errBlock = true;
      this.errTxt = error.message;
    })
  }

  getAllTrainingData(page: number) {
    this.trainingDashboard.trainingData(page).subscribe((data) => {
      this.trainingAllData = data.records;
    })
  }

  getStartingRecord(): number {
    return this.paginationMethod.getStartingRecord(this.currentPage, this.noOfRecords);
  }

  getEndingRecord(): number {
    return this.paginationMethod.getEndingRecord(this.currentPage, this.noOfRecords, this.totalRecords)
  }

  onPageChange(pageNumber: number) {
    if(pageNumber >= 1 && pageNumber <= this.totalPages ) {
      if (this.lastSearchQuery.trim() !== '') {
        // If there was a search query, use it to get filtered data
        this.getTrainingData(pageNumber, this.noOfRecords, this.lastSearchQuery);
      } else {
        // If no search query, get all data
        this.getTrainingData(pageNumber, this.noOfRecords);
      }
    }
  }

  onSearch() {
    this.currentPage = 1;
    if (this.searchQuery.trim() !== '') {
      // Save the search query
      this.lastSearchQuery = this.searchQuery;
      this.getTrainingData(this.currentPage, this.noOfRecords, this.searchQuery);
    } else {
      // If the search query is empty, retrieve all data.
      this.lastSearchQuery = ''; // Clear the last search query
      this.getTrainingData(this.currentPage, this.noOfRecords);
    }
  }

  exportData(): void {

   let dataToExport: TrainingData[];

   if (this.lastSearchQuery.trim() !== '') {
     // Export only filtered data
     dataToExport = this.trainingData;
   } else {
     // Export all data
     dataToExport = this.trainingAllData.length > 0 ? this.trainingAllData : this.trainingData;
   }
 
   this.excelExportService.exportToExcel(dataToExport, 'exported_training_data');
  }

}
