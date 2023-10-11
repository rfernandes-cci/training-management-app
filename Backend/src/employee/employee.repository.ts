import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmplyeeDto } from './dto/update-emplyee.dto';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }

  async createRecord(createEmployeeeDto: CreateEmployeeDto): Promise<Employee> {
    const newUser = this.create(createEmployeeeDto);
    const createdEmployee = await this.save(newUser);

    return createdEmployee;
  }

  async getAll(): Promise<Employee[]> {
    const employees = await this.find({
      relations: {
        trainingDetail: true,
        certificationAchieved: true,
        certificationOngoing: true,
      },
    });
    return employees;
  }

  async getOneEmployee(id: string): Promise<Employee> {
    const employee = await this.findOne({
      where: { empId: id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found`);
    }

    return employee;
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmplyeeDto) {
    const user = await this.getOneEmployee(id);
    const updateUser = Object.assign(user, updateEmployeeDto);
    const updatedUser = await this.save(updateUser);
    return updatedUser;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    const employee = await this.getOneEmployee(id);

    await this.delete(employee);
    return employee;
  }

  async getTrainingDetailsForEmployee(id: string): Promise<Employee> {
    const query = this.createQueryBuilder('employee');
    const employee = await query
      .leftJoinAndSelect('employee.trainingDetail', 'trainingDetail')
      .leftJoinAndSelect('trainingDetail.batchId', 'batch')
      .leftJoinAndSelect('employee.certificationAchieved', 'achieved')
      .leftJoinAndSelect('achieved.exam', 'exam')
      .leftJoinAndSelect('employee.certificationOngoing', 'ongoing')
      .leftJoinAndSelect('ongoing.exam', 'ongoingExam')
      .where('employee.empId = :id', { id: id })
      .getOne();

    if (!employee) {
      throw new NotFoundException(`Employee with ID: ${id} not found`);
    }

    return employee;
  }
}
