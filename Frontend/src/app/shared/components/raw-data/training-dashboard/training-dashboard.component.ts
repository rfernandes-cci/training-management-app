import { Component, OnInit } from '@angular/core';
import { TrainingDashboardService } from 'src/app/core/services/training-dashboard/training-dashboard.service';
import { TrainingData } from 'src/app/shared/interfaces/TrainingData/training-data';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.scss']
})
export class TrainingDashboardComponent implements OnInit {
  
   trainingData: TrainingData[] = []

  constructor(private trainingDashboard: TrainingDashboardService) { }

  ngOnInit(): void {
    this.getTrainingData();
  }

  getTrainingData() {
    this.trainingDashboard.trainingData().subscribe((data) => {
      this.trainingData = data.records;
      console.log(data);
    })
  }


}
