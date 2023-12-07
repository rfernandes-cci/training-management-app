import { Injectable } from '@angular/core';
import { CheckboxDetails } from 'src/app/shared/interfaces/Checkbox/checkbox-details';

@Injectable({
  providedIn: 'root'
})
export class TrainingDataCheckboxService {

  constructor() { }

  trainingCheckbox:string = 'trainingCheckbox'

  saveCheckboxState(checkboxes: CheckboxDetails[]): void {
    localStorage.setItem(this.trainingCheckbox, JSON.stringify(checkboxes))
  }

  getCheckboxState(): CheckboxDetails[] {
    const storedCheck = localStorage.getItem(this.trainingCheckbox);
    return storedCheck ? JSON.parse(storedCheck) : [];
  }



}
