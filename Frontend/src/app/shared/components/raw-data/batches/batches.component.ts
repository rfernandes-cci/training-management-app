import { Component, OnInit } from '@angular/core';
import Constants from 'src/app/core/constants/constants';
import { BatchStatusService } from 'src/app/core/services/batches/batch-status.service';
import { BatchesTechService } from 'src/app/core/services/batches/batches-tech.service';
import { BatchesService } from 'src/app/core/services/batches/batches.service';
import { ExcelExportService } from 'src/app/core/services/excel-export/excel-export.service';
import { PaginationMethodsService } from 'src/app/core/services/pagination-methods/pagination-methods.service';
import { BatchDataCheckboxService } from 'src/app/core/services/saved-checkboxes/batch-data-checkbox.service';
import { BatchData } from 'src/app/shared/interfaces/BatchData/batch-data';
import { BatchTechStatusData } from 'src/app/shared/interfaces/BatchData/batch-tech-data';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {

  storeBatchData:BatchData[] = [];
  storeBatchTech:BatchTechStatusData =[];
  storeBatchStatus:BatchTechStatusData = [];
  storeAllBatchData:BatchData[] = [];
  currentPage: number = Constants.currentPage;
  totalPages: number = Constants.totalPages;
  totalRecords: number = Constants.totalRecords;
  noOfRecords: number = Constants.noOfRecords;
  pageNo: number = Constants.pageZero;
  checkboxes = [
   { label: 'Is Processed', field: 'isProcessed', checked: false },
   { label: 'Updated At', field:'updatedAt', checked: false},
   { label: 'No. Of Success', field:'NoSuccess', checked: false},
   { label: 'No. Of Failed', field: 'NoFailed', checked: false}
  ]
  isCollapsed: boolean = false;
  selectedTechOption: string = 'Select Tech';
  selectedStatus: string = 'Select Status'
  lastSearchQuery: string = '';
  lastSearchStatus: string = '';

  constructor(private batchService: BatchesService, 
              private paginationMethod: PaginationMethodsService,
              private batchDataCheckboxService: BatchDataCheckboxService,
              private batchesTechService: BatchesTechService,
              private batchStatusService: BatchStatusService,
              private excelExportService: ExcelExportService ) { }

  ngOnInit(): void {
    this.batchData(this.currentPage, this.noOfRecords);
    this.batchAllData(this.pageNo);
    this.batchTechData();
    this.batchStatus();

    const getSavedCheckboxes = this.batchDataCheckboxService.getCheckboxState();

    if(getSavedCheckboxes.length > 0) {
      this.checkboxes = getSavedCheckboxes;
    }


  }

  onCheckboxChange(data:string, isChk:boolean){
    const checkbox = this.checkboxes.find(cb => cb.field === data);

    if(checkbox) {
      checkbox.checked = isChk;
      this.batchDataCheckboxService.saveCheckboxState(this.checkboxes);
    }
  }

  getCheckboxState(field: string): boolean {
    const checkbox = this.checkboxes.find(cb => cb.field === field)
    return checkbox ? checkbox.checked : false
  }

  batchData(page: number, noOfRecords?: number, selectedTechOption?: string, selectedStatus?: string) {
    this.batchService.getBatchData(page,noOfRecords, selectedTechOption, selectedStatus).subscribe((data)=> {
      console.log(data);
      this.storeBatchData = data.records;
      this.totalPages = data.totalPages;
      this.totalRecords = data.totalRecords;
      this.currentPage = data.currentPage;
      console.log(this.storeBatchData);
    })
  }

  batchAllData(page: number) {
    this.batchService.getBatchData(page).subscribe((data) => {
      this.storeAllBatchData = data.records;
    })
  }

  batchTechData() {
    this.batchesTechService.getAllTech().subscribe((data) => {
      this.storeBatchTech = data;
      console.log(data)
    })
  }

  batchStatus() {
    this.batchStatusService.getAllStatus().subscribe((data) => {
      this.storeBatchStatus = data;
    })
  }

  selectTechOption(data: string) {
    this.selectedTechOption = data;
  }

  selectStatus(data: string) {
    this.selectedStatus = data;
  }

  getStartingRecord(): number {
    return this.paginationMethod.getStartingRecord(this.currentPage, this.noOfRecords);
  }

  getEndingRecord(): number {
    return this.paginationMethod.getEndingRecord(this.currentPage, this.noOfRecords, this.totalRecords)
  }

  onPageChange(pageNumber: number) {
    if(pageNumber >= 1 && pageNumber <= this.totalPages) {
      if(this.lastSearchQuery.trim() !== '' || this.lastSearchStatus.trim() !== '' ) {
        this.batchData(pageNumber, this.noOfRecords, this.lastSearchQuery, this.lastSearchStatus)
      }
      else {
        this.batchData(pageNumber, this.noOfRecords)
      }
    }
  }

  resetToDefault() {
    for(const checkbox of this.checkboxes) {
      checkbox.checked = false;
    }

    this.batchDataCheckboxService.saveCheckboxState([]);
  }

  searchOnTech() {
    if(this.selectedTechOption == 'Select Option') {
      this.lastSearchQuery = '';
    }
    else {
      this.lastSearchQuery = this.selectedTechOption;
    }

    this.currentPage = 1;
    this.batchData(this.currentPage, this.noOfRecords, this.lastSearchQuery, this.lastSearchStatus);
  }

  searchOnStatus() {
    this.selectedStatus == 'Select Status' ? this.lastSearchStatus = '' : this.lastSearchStatus = this.selectedStatus;
    this.currentPage = 1;
    this.batchData(this.currentPage, this.noOfRecords, this.selectedTechOption, this.selectedStatus);
  }

  exportData(): void {

    let dataToExport: BatchData[];
 
    if (this.lastSearchQuery.trim() !== '') {
      // Export only filtered data
      dataToExport = this.storeBatchData;
    } else {
      // Export all data
      dataToExport = this.storeAllBatchData.length > 0 ? this.storeAllBatchData : this.storeBatchData;
    }
  
    this.excelExportService.exportToExcel(dataToExport, 'exported_batch_data');
   }

}
