import { Injectable } from '@nestjs/common';
import { ApprovedCertificationService } from 'src/approved-certification/approved-certification.service';
import { BatchService } from 'src/batch/batch.service';
import { CertificationAchievedService } from 'src/certification-achieved/certification-achieved.service';
import { EmployeeService } from 'src/employee/employee.service';
import { TrainingDetailService } from 'src/training-detail/training-detail.service';

@Injectable()
export class NormalizeService {
  constructor(
    private employeeService: EmployeeService,
    private batchService: BatchService,
    private trainingDetailService: TrainingDetailService,
    private approvedCertificationSevice: ApprovedCertificationService,
    private certificationAchievedService: CertificationAchievedService,
  ) {}

  async normalizeEmployee() {
    return await this.employeeService.transferFromRawTable();
  }

  async normalizeBatch() {
    return await this.batchService.transferRawData();
  }

  async normalizeTrainingDetail() {
    return await this.trainingDetailService.transferRawData();
  }

  async normalizeApprovedCertification() {
    return await this.approvedCertificationSevice.transferRawData();
  }

  async normalizecertificationAchieved() {
    return await this.certificationAchievedService.transferRawData();
  }
}
