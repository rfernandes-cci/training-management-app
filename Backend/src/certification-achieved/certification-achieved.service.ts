import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CertificationAchievedRepository } from './certification-achieved.repository';
import { CertificationAchieved } from './entities/certification-achieved.entity';
import { CreateCertificationAchievedDto } from './dto/create-certification-achieved.dto';
import { UpdateCertificationAchievedDto } from './dto/update-certification-achieved.dto';
import { RawAchievedRepository } from 'src/raw-data/certification/raw-achieved.repository';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { RawApprovedCertificationRepository } from 'src/raw-data/certification/raw-approved-certification.repository';
import { ApprovedCertificationRepository } from 'src/approved-certification/approved-certification.repository';

@Injectable()
export class CertificationAchievedService {
  private logger = new Logger('CertificationAchievedService');
  constructor(
    private certificationAchivedRepository: CertificationAchievedRepository,
    private rawAchievedRepo: RawAchievedRepository,
    private employeeRepo: EmployeeRepository,
    private approvedCertificationRepo: ApprovedCertificationRepository,
  ) {}

  async createCertificationAchieved(
    createCertificationAchieved: CreateCertificationAchievedDto,
  ): Promise<CertificationAchieved> {
    return await this.certificationAchivedRepository.createRecord(
      createCertificationAchieved,
    );
  }

  async getAll(): Promise<CertificationAchieved[]> {
    return await this.certificationAchivedRepository.getAll();
  }

  async getOne(id: string): Promise<CertificationAchieved> {
    return await this.certificationAchivedRepository.getOne(id);
  }

  async updateData(
    id: string,
    updateCertificationAchievedDto: UpdateCertificationAchievedDto,
  ): Promise<CertificationAchieved> {
    return await this.certificationAchivedRepository.updateData(
      id,
      updateCertificationAchievedDto,
    );
  }

  async deleteData(id: string): Promise<CertificationAchieved> {
    return await this.certificationAchivedRepository.deleteData(id);
  }

  async transferRawData() {
    const rawAchievedData = await this.rawAchievedRepo.find({
      where: { isProcessed: false },
    });

    if (rawAchievedData.length === 0) {
      this.logger.log(
        'No Data present in raw_training_dashboard table to process',
      );
      return {
        message: 'No Data present in raw_training_dashboard table to process',
      };
    }

    let newData = new CreateCertificationAchievedDto();

    for (const data of rawAchievedData) {
      const employee = await this.employeeRepo.getOneEmployee(data.empId);

      const exam = await this.approvedCertificationRepo.findOne({
        where: {
          certificationName: data.exam,
          level: data.level,
          tech: data.certification,
        },
      });

      if (!exam) {
        throw new NotFoundException(
          `Approved Certification for Tech:${data.certification}, Certification Name:${data.exam}, Level:${data.level}`,
        );
      }

      newData.empId = employee;
      newData.exam = exam;
      newData.achievedDate = data.achievedDate;
      newData.expiryDate = data.expiryDate;
      newData.certificatiionLink =
        data.certificationLink === 'NA' ? null : data.certificationLink;

      await this.certificationAchivedRepository.createRecord(newData);
      await this.rawAchievedRepo.updateData(data, {
        isProcessed: true,
      });
    }
  }
}
