import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './shared/components/jobs/jobs.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { TrainingDashboardComponent } from './shared/components/raw-data/training-dashboard/training-dashboard.component';
import { BatchesComponent } from './shared/components/raw-data/batches/batches.component';
import { EmployeesComponent } from './shared/components/raw-data/employees/employees.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { FooterComponent } from './core/layouts/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    FileUploadComponent,
    TrainingDashboardComponent,
    BatchesComponent,
    EmployeesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
