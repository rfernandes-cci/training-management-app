import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RawOngoing } from './entities/raw-ongoing.entity';
import { PaginatedResponse } from 'src/core/pagination.interface';
import { CreateOnGoingDto } from './dto/create-ongoing.dto';
import { UpdateOnGoingDto } from './dto/update-ongoing.dto';

@Injectable()
export class RawOnGoingRepository extends Repository<RawOngoing> {
  constructor(private dataSource: DataSource) {
    super(RawOngoing, dataSource.createEntityManager());
  }

  async createNewEntry(newData: CreateOnGoingDto) {
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
    firstName: string,
    certification: string,
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

    if (firstName) {
      queryBuilder = queryBuilder.where('entity.first_name ILIKE :name', {
        name: `%${firstName}%`,
      });
    }
    if (certification) {
      queryBuilder = queryBuilder.andWhere(
        'entity.certification ILIKE :certification',
        {
          certification: `%${certification}%`,
        },
      );
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

  async getOne(id: string): Promise<RawOngoing> {
    const result = await this.findOne({ where: { empId: id } });

    if (!result) {
      throw new NotFoundException(`Data with ID: ${id} not found`);
    }
    return result;
  }

  async updateData(
    row: RawOngoing,
    updateTrainingDashDto: UpdateOnGoingDto,
  ): Promise<RawOngoing> {
    try {
      const updateUserEntity = Object.assign(row, updateTrainingDashDto);
      const updatedUser = await this.save(updateUserEntity);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findExisting(conditions: any): Promise<RawOngoing[]> {
    const { empId, firstName, certification, exam } = conditions;

    const existing = this.find({
      where: {
        empId: empId,
        firstName: firstName,
        certification: certification,
        exam: exam,
      },
    });

    return existing;
  }
}
