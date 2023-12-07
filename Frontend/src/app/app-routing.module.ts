import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { TrainingDashboardComponent } from './shared/components/raw-data/training-dashboard/training-dashboard.component';
import { BatchesComponent } from './shared/components/raw-data/batches/batches.component';
import { EmployeesComponent } from './shared/components/raw-data/employees/employees.component';
import { JobsComponent } from './shared/components/jobs/jobs/jobs.component';
import { JobsDetailsComponent } from './shared/components/jobs/jobs-details/jobs-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'upload', pathMatch: 'full'},
  {path: 'upload', component: FileUploadComponent},
  {path: 'raw-data/training-dashboard', component: TrainingDashboardComponent},
  {path: 'raw-data/batches', component: BatchesComponent},
  {path: 'raw-data/employees', component: EmployeesComponent},
  {path: 'jobs', component: JobsComponent},
  { path: 'job-details/:jobId', component: JobsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
