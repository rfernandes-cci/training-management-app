import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationMethodsService {

  constructor() { }


  getStartingRecord(currentPage: number, noOfRecords:number): number {
    return (currentPage - 1) * noOfRecords + 1;
  }

  getEndingRecord(currentPage: number, noOfRecords:number, totalRecords:number): number {
    const end = currentPage * noOfRecords;
    return end > totalRecords ? totalRecords : end;
  }
  
}
