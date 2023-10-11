import { Injectable } from '@nestjs/common';
import { CertificationOngoingRepository } from './certification-ongoing.repository';
import { CertificationOngoing } from './entities/certification-ongoing.entity';
import { CreateCertificationOngoingDto } from './dto/create-certification-ongoing.dto';
import { UpdateCertificationOngoingDto } from './dto/update-certification-ongoing.dto';

@Injectable()
export class CertificationOngoingService {
  constructor(
    private certificationOngoingRepository: CertificationOngoingRepository,
  ) {}

  async createCertificationOngoing(
    createCertificationOngoingDto: CreateCertificationOngoingDto,
  ): Promise<CertificationOngoing> {
    return await this.certificationOngoingRepository.createRecord(
      createCertificationOngoingDto,
    );
  }

  async getAll(): Promise<CertificationOngoing[]> {
    return await this.certificationOngoingRepository.getAll();
  }

  async getOne(id: string): Promise<CertificationOngoing> {
    return await this.certificationOngoingRepository.getOne(id);
  }

  async updateData(
    id: string,
    updateCertificationOngoingDto: UpdateCertificationOngoingDto,
  ): Promise<CertificationOngoing> {
    return await this.certificationOngoingRepository.updateData(
      id,
      updateCertificationOngoingDto,
    );
  }

  async deleteData(id: string): Promise<CertificationOngoing> {
    return await this.certificationOngoingRepository.deleteData(id);
  }
}
