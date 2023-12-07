import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './shared/components/jobs/jobs/jobs.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { TrainingDashboardComponent } from './shared/components/raw-data/training-dashboard/training-dashboard.component';
import { BatchesComponent } from './shared/components/raw-data/batches/batches.component';
import { EmployeesComponent } from './shared/components/raw-data/employees/employees.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JobsDetailsComponent } from './shared/components/jobs/jobs-details/jobs-details.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    FileUploadComponent,
    TrainingDashboardComponent,
    BatchesComponent,
    EmployeesComponent,
    HeaderComponent,
    FooterComponent,
    JobsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
