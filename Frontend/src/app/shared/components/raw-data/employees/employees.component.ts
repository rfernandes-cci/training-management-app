import { Component, OnInit } from '@angular/core';
import Constants from 'src/app/core/constants/constants';
import { EmployeesService } from 'src/app/core/services/employees/employees.service';
import { ExcelExportService } from 'src/app/core/services/excel-export/excel-export.service';
import { PaginationMethodsService } from 'src/app/core/services/pagination-methods/pagination-methods.service';
import { EmployeeDataCheckboxService } from 'src/app/core/services/saved-checkboxes/employee-data-checkbox.service';
import { EmployeeData } from 'src/app/shared/interfaces/EmployeeData/employee-data';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  selectedOption: string = 'Active';
  currentPage: number = Constants.currentPage;
  totalPages: number = Constants.totalPages;
  totalRecords: number = Constants.totalRecords;
  noOfRecords: number = Constants.noOfRecords;
  storedEmployeeData:EmployeeData[] = [];
  storedAllEmployeeData:EmployeeData[] = [];
  isCollapsed: boolean = false;
  checkboxes = [
    { label: 'Is Processed', field: 'isProcessed', checked: false },
    { label: 'Updated At', field:'updatedAt', checked: false},
    { label: 'No. Of Success', field:'NoSuccess', checked: false},
    { label: 'No. Of Failed', field: 'NoFailed', checked: false}
   ]
   searchQuery: string = '';
   lastSearchQuery: string = '';


  constructor(private employeesService:EmployeesService, 
              private paginationMethod: PaginationMethodsService,
              private employeeDataCheckboxService: EmployeeDataCheckboxService,
              private excelExportService: ExcelExportService) { }

  ngOnInit(): void {
    this.getEmployeeData(this.currentPage, this.noOfRecords, this.selectedOption);

    const getSavedCheckboxes = this.employeeDataCheckboxService.getCheckboxState();

    if(getSavedCheckboxes.length > 0) {
      this.checkboxes = getSavedCheckboxes;
    }
  }

  onCheckboxChange(data:string, isChk:boolean){
    const checkbox = this.checkboxes.find(cb => cb.field === data);

    if(checkbox) {
      checkbox.checked = isChk;
      this.employeeDataCheckboxService.saveCheckboxState(this.checkboxes);
    }
  }

  getCheckboxState(field: string): boolean {
    const checkbox = this.checkboxes.find(cb => cb.field === field)
    return checkbox ? checkbox.checked : false
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.currentPage = 1;
    this.totalPages = 0;
    this.totalRecords = 0;
    this.getEmployeeData(this.currentPage, this.noOfRecords, this.selectedOption);
  }

  getStartingRecord(): number {
    return this.paginationMethod.getStartingRecord(this.currentPage, this.noOfRecords);
  }

  getEndingRecord(): number {
    return this.paginationMethod.getEndingRecord(this.currentPage, this.noOfRecords, this.totalRecords)
  }

  onPageChange(pageNumber: number) {
    if(pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.getEmployeeData(pageNumber, this.noOfRecords, this.selectedOption);
    }
  }

  getEmployeeData(page: number, noOfRecords: number, status: string, name?: string) {
    this.employeesService.employeeData(page, noOfRecords, status, name).subscribe((data) => {
      this.storedEmployeeData = data.records;
      this.totalRecords = data.totalRecords;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      console.log(this.storedEmployeeData)
    })
  }

  getAllEmployeeData(page: number) {
    this.employeesService.employeeData(page).subscribe((data) => {
      this.storedAllEmployeeData = data.records
    })
  }

  resetToDefault() {
    for(const checkbox of this.checkboxes) {
      checkbox.checked = false;
    }

   this.employeeDataCheckboxService.saveCheckboxState([]);
  }

  onSearch() {
    this.currentPage = 1;
  
    if (this.searchQuery.trim() !== '') {
      // Save the search query
      this.lastSearchQuery = this.searchQuery;
      this.getEmployeeData(this.currentPage, this.noOfRecords, this.selectedOption, this.lastSearchQuery);
    } else {
      // If the search query is empty, retrieve all data.
      this.lastSearchQuery = ''; // Clear the last search query
      this.getEmployeeData(this.currentPage, this.noOfRecords, this.selectedOption);
    }
  }

  exportData(): void {

    let dataToExport: EmployeeData[];
 
    if (this.lastSearchQuery.trim() !== '') {
      // Export only filtered data
      dataToExport = this.storedEmployeeData;
    } else {
      // Export all data
      dataToExport = this.storedAllEmployeeData.length > 0 ? this.storedAllEmployeeData : this.storedEmployeeData;
    }
  
    this.excelExportService.exportToExcel(dataToExport, 'exported_training_data');
   }

  
}
