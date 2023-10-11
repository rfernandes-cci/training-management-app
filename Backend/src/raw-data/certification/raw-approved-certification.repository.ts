import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RawApprovedCertification } from './entities/raw-approved-certification.entity';
import { PaginatedResponse } from 'src/core/pagination.interface';
import { CreateApprovedCertificationDto } from './dto/create-approved-certification.dto';
import { UpdateApprovedCertificationDTO } from './dto/update-approved-certification.dto';

@Injectable()
export class RawApprovedCertificationRepository extends Repository<RawApprovedCertification> {
  constructor(private dataSource: DataSource) {
    super(RawApprovedCertification, dataSource.createEntityManager());
  }

  async createNewEntry(newData: CreateApprovedCertificationDto) {
    try {
      const newRow = this.create(newData);
      await this.save(newRow);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(
    pageNo: number,
    noOfRecords: number,
    orderBy: string,
    order: string,
    certificationName: string,
    level: string,
  ): Promise<PaginatedResponse> {
    const take = noOfRecords || 10;
    const page = pageNo || 1;
    const skip = (page - 1) * take;
    const orderByValue = orderBy || 'createdAt';
    let queryBuilder = this.createQueryBuilder('entity');

    if (pageNo == 0) {
      queryBuilder.orderBy(
        `entity.${orderByValue}`,
        order === 'asc' ? 'ASC' : 'DESC',
      );
    } else {
      queryBuilder
        .orderBy(`entity.${orderByValue}`, order === 'asc' ? 'ASC' : 'DESC')
        .take(take)
        .skip(skip);
    }

    if (certificationName) {
      queryBuilder = queryBuilder.where(
        'entity.certificationName ILIKE :name',
        {
          name: `%${certificationName}%`,
        },
      );
    }

    if (level) {
      queryBuilder = queryBuilder.andWhere('entity.level ILIKE :level', {
        level: `%${level}%`,
      });
    }

    if (pageNo == 0) {
      const res = await queryBuilder.getMany();
      return { records: res };
    }

    const [result, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / take);

    return {
      records: result,
      totalRecords: total,
      totalPages,
      currentPage: Number(page),
    };
  }

  async getOne(id: string): Promise<RawApprovedCertification> {
    const result = await this.findOne({ where: { id: id } });

    if (!result) {
      throw new NotFoundException(`Data with ID: ${id} not found`);
    }
    return result;
  }

  async updateData(
    row: RawApprovedCertification,
    updateTrainingDashDto: UpdateApprovedCertificationDTO,
  ): Promise<RawApprovedCertification> {
    try {
      const updateUserEntity = Object.assign(row, updateTrainingDashDto);
      const updatedUser = await this.save(updateUserEntity);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findExisting(conditions: any): Promise<RawApprovedCertification[]> {
    const { tech, certificationName, level } = conditions;

    const existing = this.find({
      where: {
        tech: tech,
        certificationName: certificationName,
        level: level,
      },
    });

    return existing;
  }
}
