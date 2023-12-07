import { Injectable } from '@angular/core';
import { CheckboxDetails } from 'src/app/shared/interfaces/Checkbox/checkbox-details';

@Injectable({
  providedIn: 'root'
})
export class BatchDataCheckboxService {

  constructor() { }

  batchData: string = 'batchData';

  saveCheckboxState(checkboxes: CheckboxDetails[]): void {
    localStorage.setItem(this.batchData, JSON.stringify(checkboxes))
  }

  getCheckboxState(): CheckboxDetails[] {
    const storedCheck = localStorage.getItem(this.batchData)
    return storedCheck ? JSON.parse(storedCheck) : [];
  }
}
