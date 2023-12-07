import { Injectable } from '@angular/core';
import { CheckboxDetails } from 'src/app/shared/interfaces/Checkbox/checkbox-details';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataCheckboxService {

  constructor() { }

  employeeData: string = 'employeeData';

  saveCheckboxState(checkboxes: CheckboxDetails[]): void {
    localStorage.setItem(this.employeeData, JSON.stringify(checkboxes))
  }

  getCheckboxState(): CheckboxDetails[] {
    const storedCheck = localStorage.getItem(this.employeeData)
    return storedCheck ? JSON.parse(storedCheck) : [];
  }
}
