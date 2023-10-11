import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CertificationAchieved } from './entities/certification-achieved.entity';
import { CreateCertificationAchievedDto } from './dto/create-certification-achieved.dto';
import { UpdateCertificationAchievedDto } from './dto/update-certification-achieved.dto';

@Injectable()
export class CertificationAchievedRepository extends Repository<CertificationAchieved> {
  constructor(private dataSource: DataSource) {
    super(CertificationAchieved, dataSource.createEntityManager());
  }

  async createRecord(
    createCertificationAchieved: CreateCertificationAchievedDto,
  ): Promise<CertificationAchieved> {
    const newData = this.create(createCertificationAchieved);
    const createdData = await this.save(newData);

    return createdData;
  }

  async getAll(): Promise<CertificationAchieved[]> {
    const data = await this.find();
    return data;
  }

  async getOne(id: string): Promise<CertificationAchieved> {
    const data = await this.findOne({ where: { id: id } });

    if (!data) {
      throw new NotFoundException(`Data with ID: ${id} not found`);
    }

    return data;
  }

  async updateData(
    id: string,
    updateCertificationAchievedDto: UpdateCertificationAchievedDto,
  ) {
    const data = await this.getOne(id);
    const updateData = Object.assign(data, updateCertificationAchievedDto);
    const updatedData = await this.save(updateData);
    return updatedData;
  }

  async deleteData(id: string): Promise<CertificationAchieved> {
    const data = await this.getOne(id);

    await this.delete(data);
    return data;
  }
}
