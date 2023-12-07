import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDetailsService } from 'src/app/core/services/jobs/job-details.service';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent implements OnInit {

  jobId: string | null= '';
  jobDetails: any;

  constructor(private route: ActivatedRoute,
              private jobDetailsService: JobDetailsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.jobId = params.get('jobId');
      this.getJobDetails();
    });
  }

  getJobDetails() {
    if (this.jobId !== null) {
      this.jobDetailsService.getJobDetails(this.jobId).subscribe((data) => {
        this.jobDetails = data;
        console.log(data)
      });
    }
  }

}
