import { Injectable, Logger } from '@nestjs/common';
import { ApprovedCertification } from './entities/approved-certification.entity';
import { ApprovedCertificationRepository } from './approved-certification.repository';
import { UpdateApprovedCertificationDto } from './dto/update-approved-certification.dto';
import { CreateApprovedCertificationDto } from './dto/create-approved-certification.dto';
import { RawApprovedCertificationRepository } from 'src/raw-data/certification/raw-approved-certification.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ApprovedCertificationService {
  private logger = new Logger('ApprovedCertificationService');
  constructor(
    private approvedCertificationRepo: ApprovedCertificationRepository,
    private rawApprovedCertificationRepo: RawApprovedCertificationRepository,
  ) {}

  async createApprovedCertification(
    createApprovedCertificationDto: CreateApprovedCertificationDto,
  ): Promise<ApprovedCertification> {
    return await this.approvedCertificationRepo.createRecord(
      createApprovedCertificationDto,
    );
  }

  async getAll(): Promise<ApprovedCertification[]> {
    return await this.approvedCertificationRepo.getAll();
  }

  async getOne(id: string): Promise<ApprovedCertification> {
    return await this.approvedCertificationRepo.getOne(id);
  }

  async updateData(
    id: string,
    updateApprovedCertificationDto: UpdateApprovedCertificationDto,
  ): Promise<ApprovedCertification> {
    return await this.approvedCertificationRepo.updateData(
      id,
      updateApprovedCertificationDto,
    );
  }

  async deleteData(id: string): Promise<ApprovedCertification> {
    return await this.approvedCertificationRepo.deleteData(id);
  }

  async transferRawData() {
    const rawApprovedCertification =
      await this.rawApprovedCertificationRepo.find({
        where: { isProcessed: false },
      });
    if (rawApprovedCertification.length === 0) {
      this.logger.log(
        'No Data present in raw_approved_certification to process',
      );
      return {
        message: 'No Data present in raw_approved_certification to process',
      };
    }
    let newData: CreateApprovedCertificationDto =
      new CreateApprovedCertificationDto();

    for (const data of rawApprovedCertification) {
      newData.tech = data.tech;
      newData.level = data.level;
      newData.certificationName = data.certificationName;
      newData.costInDollar = data.costInDollars;

      await this.approvedCertificationRepo.createRecord(newData);
      await this.rawApprovedCertificationRepo.updateData(data, {
        isProcessed: true,
      });
    }
  }
}
