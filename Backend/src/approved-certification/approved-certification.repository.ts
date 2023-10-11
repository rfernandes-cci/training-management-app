import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ApprovedCertification } from './entities/approved-certification.entity';
import { CreateApprovedCertificationDto } from './dto/create-approved-certification.dto';
import { UpdateApprovedCertificationDto } from './dto/update-approved-certification.dto';

@Injectable()
export class ApprovedCertificationRepository extends Repository<ApprovedCertification> {
  constructor(private dataSource: DataSource) {
    super(ApprovedCertification, dataSource.createEntityManager());
  }

  async createRecord(
    createApprovedCertificationDto: CreateApprovedCertificationDto,
  ): Promise<ApprovedCertification> {
    const newData = this.create(createApprovedCertificationDto);
    const createdData = await this.save(newData);

    return createdData;
  }

  async getAll(): Promise<ApprovedCertification[]> {
    const data = await this.find();
    return data;
  }

  async getOne(id: string): Promise<ApprovedCertification> {
    const data = await this.findOne({ where: { id: id } });

    if (!data) {
      throw new NotFoundException(`Certification with ID: ${id} not found`);
    }

    return data;
  }

  async updateData(
    id: string,
    updateApprovedCertificationDto: UpdateApprovedCertificationDto,
  ) {
    const data = await this.getOne(id);
    const updateData = Object.assign(data, updateApprovedCertificationDto);
    const updatedData = await this.save(updateData);
    return updatedData;
  }

  async deleteData(id: string): Promise<ApprovedCertification> {
    const data = await this.getOne(id);

    await this.delete(data);
    return data;
  }
}
