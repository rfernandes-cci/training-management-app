import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateRawEmployeeDto } from '../employee-master/dto/update-raw-active-employee.dto';
import { RawActiveEmployee } from './entities/raw-active-employee.entity';
import { PaginatedResponse } from 'src/core/pagination.interface';
import { CreateRawEmployeeDto } from './dto/create-raw-active-employee.dto';

@Injectable()
export class RawActiveEmployeeRepository extends Repository<RawActiveEmployee> {
  constructor(private dataSource: DataSource) {
    super(RawActiveEmployee, dataSource.createEntityManager());
  }

  async createNewEntry(newData: CreateRawEmployeeDto) {
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
    name: string,
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

    if (name) {
      queryBuilder = queryBuilder.where('entity.employee ILIKE :name', {
        name: `%${name}%`,
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

  async getOne(id: string): Promise<RawActiveEmployee> {
    const result = await this.findOne({ where: { employeeNumber: id } });

    if (!result) {
      throw new NotFoundException(`Data with ID: ${id} not found`);
    }
    return result;
  }

  async updateData(
    row: RawActiveEmployee,
    updateTrainingDashDto: UpdateRawEmployeeDto,
  ): Promise<RawActiveEmployee> {
    try {
      const updateUserEntity = Object.assign(row, updateTrainingDashDto);
      const updatedUser = await this.save(updateUserEntity);
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findExisting(conditions: any): Promise<RawActiveEmployee[]> {
    const { employeeNumber } = conditions;

    const existing = this.find({
      where: {
        employeeNumber: employeeNumber,
      },
    });

    return existing;
  }
}
