import { Injectable, Logger } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmplyeeDto } from './dto/update-emplyee.dto';
import { RawActiveEmployeeRepository } from 'src/raw-data/employee-master/raw-active-employee.repository';
import { RawActiveEmployee } from 'src/raw-data/employee-master/entities/raw-active-employee.entity';
import { EmployeeStatus } from './employee-status.enum';
import { RawResignedEmployeeRepository } from 'src/raw-data/employee-master/raw-resigned-employee.repository';
import { ILike } from 'typeorm';
import { CreateRawEmployeeDto } from 'src/raw-data/employee-master/dto/create-raw-active-employee.dto';

@Injectable()
export class EmployeeService {
  private logger = new Logger('EmployeeService');
  constructor(
    private employeeRepository: EmployeeRepository,
    private rawActiveEmployeeRepo: RawActiveEmployeeRepository,
    private rawResignedEmployeeRepo: RawResignedEmployeeRepository,
  ) {}

  async createEmployee(
    createEmployeeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeRepository.createRecord(createEmployeeeDto);
  }

  async getAll(): Promise<Employee[]> {
    return await this.employeeRepository.getAll();
  }

  async getOne(id: string): Promise<Employee> {
    return await this.employeeRepository.getOneEmployee(id);
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmplyeeDto,
  ): Promise<Employee> {
    return await this.employeeRepository.updateEmployee(id, updateEmployeeDto);
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.employeeRepository.deleteEmployee(id);
  }

  async transferFromRawTable() {
    try {
      while (true) {
        const [tempActiveArray, tempResignedArray] = await Promise.all([
          this.processRawEmployees(
            this.rawActiveEmployeeRepo,
            EmployeeStatus.Active,
          ),
          this.processRawEmployees(
            this.rawResignedEmployeeRepo,
            EmployeeStatus.Resigned,
          ),
        ]);

        if (tempActiveArray.length === 0 && tempResignedArray.length === 0) {
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async processRawEmployees(repo, status) {
    const rawEmployees = await repo.find({
      where: { isProcessed: false },
      order: { employeeNumber: 'ASC' },
    });

    if (rawEmployees.length === 0) {
      this.logger.log(`No data present in ${repo.metadata.name} table`);
      return [];
    }

    const tempArray = [];

    for (const emp of rawEmployees) {
      if (emp.reportingTo === null) {
        const employeeDto = this.mapRawEmployeeToDto(emp, status);
        await this.employeeRepository.createRecord(employeeDto);
        await repo.updateData(emp, { isProcessed: true });
      } else {
        const reportingToEmployee = await this.employeeRepository.findOne({
          where: { name: ILike(`%${emp.reportingTo}%`) },
        });

        if (reportingToEmployee) {
          const employeeDto = this.mapRawEmployeeToDto(
            emp,
            status,
            reportingToEmployee ? reportingToEmployee.empId : null,
          );
          await this.employeeRepository.createRecord(employeeDto);
          await repo.updateData(emp, { isProcessed: true });
        } else {
          tempArray.push(emp);
        }
      }
    }

    for (const emp of tempArray) {
      const reportingToEmployee = await this.employeeRepository.findOne({
        where: { name: ILike(`%${emp.reportingTo}%`) },
      });

      if (reportingToEmployee) {
        const employeeDto = this.mapRawEmployeeToDto(
          emp,
          status,
          reportingToEmployee ? reportingToEmployee.empId : null,
        );

        await this.employeeRepository.createRecord(employeeDto);
        await repo.updateData(emp, { isProcessed: true });
      }
    }

    return tempArray;
  }

  mapRawEmployeeToDto(emp: CreateRawEmployeeDto, status, reportingToId?) {
    return {
      empId: emp.employeeNumber,
      name: emp.employee,
      email: emp.email,
      doj: emp.doj,
      reportingTo: reportingToId === null ? emp.reportingTo : reportingToId,
      currDesignation: emp.currDesignation,
      currClient1: emp.currClient1,
      currClient2: emp.currClient2,
      currClient3: emp.currClient3,
      currClient4: emp.currClient4,
      coreTechStack: emp.currCoreTechStack,
      secondaryTechStack: emp.currSecondaryTechStack,
      status: status,
    };
  }

  async getTrainingDetailsForEmployee(id: string): Promise<Employee> {
    return await this.employeeRepository.getTrainingDetailsForEmployee(id);
  }
}
