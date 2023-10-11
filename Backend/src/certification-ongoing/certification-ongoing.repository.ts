import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CertificationOngoing } from './entities/certification-ongoing.entity';
import { CreateCertificationOngoingDto } from './dto/create-certification-ongoing.dto';
import { UpdateCertificationOngoingDto } from './dto/update-certification-ongoing.dto';

@Injectable()
export class CertificationOngoingRepository extends Repository<CertificationOngoing> {
  constructor(private dataSource: DataSource) {
    super(CertificationOngoing, dataSource.createEntityManager());
  }

  async createRecord(
    createCertificationOngoingDto: CreateCertificationOngoingDto,
  ): Promise<CertificationOngoing> {
    const newData = this.create(createCertificationOngoingDto);
    const createdData = await this.save(newData);

    return createdData;
  }

  async getAll(): Promise<CertificationOngoing[]> {
    const data = await this.find();
    return data;
  }

  async getOne(id: string): Promise<CertificationOngoing> {
    const data = await this.findOne({ where: { id: id } });

    if (!data) {
      throw new NotFoundException(`Data with ID: ${id} not found`);
    }

    return data;
  }

  async updateData(
    id: string,
    updateCertificationOngoingDto: UpdateCertificationOngoingDto,
  ) {
    const data = await this.getOne(id);
    const updateData = Object.assign(data, updateCertificationOngoingDto);
    const updatedData = await this.save(updateData);
    return updatedData;
  }

  async deleteData(id: string): Promise<CertificationOngoing> {
    const data = await this.getOne(id);

    await this.delete(data);
    return data;
  }
}
