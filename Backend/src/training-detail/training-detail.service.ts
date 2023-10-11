import { Injectable, Logger } from '@nestjs/common';
import { TrainingDetailRepository } from './training-detail.repository';
import { TrainingDetail } from './entities/training-detail.entity';
import { CreateTrainingDetailDto } from './dto/create-training-detail.dto';
import { UpdateTrainingDetailDto } from './dto/update-training-detail.dto';
import { RawTrainingDashboardRepository } from 'src/raw-data/overall-training/raw-training-dashboard.repository';
import { BatchRepository } from 'src/batch/batch.repository';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeStatus } from 'src/employee/employee-status.enum';
import { ILike } from 'typeorm';
import { CreateBatchDto } from 'src/batch/dto/create-batch.dto';

@Injectable()
export class TrainingDetailService {
  private logger = new Logger('TrainingDetailService');
  constructor(
    private trainingDetailRepository: TrainingDetailRepository,
    private rawTrainingDashboardRepo: RawTrainingDashboardRepository,
    private batchRepo: BatchRepository,
    private employeeRepo: EmployeeRepository,
  ) {}

  async createTrainingDetail(
    createTrainingDetailDto: CreateTrainingDetailDto,
  ): Promise<TrainingDetail> {
    return await this.trainingDetailRepository.createRecord(
      createTrainingDetailDto,
    );
  }

  async getAll(
    empId: string,
    supId: string,
    clientName: string,
  ): Promise<TrainingDetail[]> {
    return await this.trainingDetailRepository.getAll(empId, supId, clientName);
  }

  async getOne(id: string): Promise<TrainingDetail> {
    return await this.trainingDetailRepository.getOne(id);
  }

  async updateData(
    id: string,
    updateTrainingDetailDto: UpdateTrainingDetailDto,
  ): Promise<TrainingDetail> {
    return await this.trainingDetailRepository.updateData(
      id,
      updateTrainingDetailDto,
    );
  }

  async deleteData(id: string): Promise<TrainingDetail> {
    return await this.trainingDetailRepository.deleteData(id);
  }

  async transferRawData() {
    const rawTrainingDashboardData = await this.rawTrainingDashboardRepo.find({
      where: { isProcessed: false },
      order: { empId: 'ASC' },
    });

    if (rawTrainingDashboardData.length === 0) {
      this.logger.log(
        'No Data present in raw_training_dashboard table to process',
      );
      return {
        message: 'No Data present in raw_training_dashboard table to process',
      };
    }

    let newData: CreateTrainingDetailDto = new CreateTrainingDetailDto();

    for (const data of rawTrainingDashboardData) {
      const convertedTrainingStartDate = this.convertDate(
        data.trainingStartDate,
      );

      const batch = await this.batchRepo.findBatch(
        data.batchType,
        data.batchTypeDescription,
        convertedTrainingStartDate,
      );

      let employee: Employee;
      if (data.empId == 'Trainee') {
        // Find the last trainee's index number
        const lastTrainee = await this.employeeRepo.findOne({
          where: { empId: ILike(`Trainee%`) },
          order: { empId: 'DESC' },
        });

        // Calculate the new trainee's index number
        let newIndex = 1;
        if (lastTrainee && lastTrainee.empId) {
          const lastTraineeIndex = parseInt(
            lastTrainee.empId.match(/\d+$/)[0],
            10,
          );
          newIndex = lastTraineeIndex + 1;
        }

        const reportingToEmployee = await this.employeeRepo.findOne({
          where: { name: ILike(`%${data.reportingManager}%`) },
        });

        const newTraineeData = new CreateEmployeeDto();

        if (reportingToEmployee) {
          newTraineeData.reportingTo = reportingToEmployee.empId;
        }

        newTraineeData.empId = `Trainee-${newIndex}`;
        newTraineeData.name = data.name;
        newTraineeData.email = 'NA';
        newTraineeData.currDesignation = 'Trainee';
        newTraineeData.currClient1 = '0No client - Unassigned';
        newTraineeData.coreTechStack = 'NA';
        newTraineeData.status = EmployeeStatus.Exit;

        await this.employeeRepo.createRecord(newTraineeData);

        newData.batchId = batch.id;
        newData.empId = newTraineeData.empId;

        await this.trainingDetailRepository.createRecord(newData);
        await this.rawTrainingDashboardRepo.updateData(data, {
          isProcessed: true,
        });
        continue;
      } else {
        employee = await this.employeeRepo.getOneEmployee(data.empId);
      }

      if (batch !== null) {
        newData.batchId = batch.id;
        newData.empId = employee.empId;

        await this.trainingDetailRepository.createRecord(newData);
        await this.rawTrainingDashboardRepo.updateData(data, {
          isProcessed: true,
        });
      } else {
        const batchWithChildren =
          await this.batchRepo.getBatchesWithChildrenValue(
            data.batchType,
            data.batchTypeDescription,
          );

        if (Object.keys(batchWithChildren).length === 0) {
          const formatedBatchTypeDescription = this.removeGPart(
            data.batchTypeDescription,
          );
          const parentBatch = await this.batchRepo.findBatch(
            data.batchType.trimEnd(),
            formatedBatchTypeDescription.trimEnd(),
            convertedTrainingStartDate,
          );

          const newChildBatch = new CreateBatchDto();
          newChildBatch.batchTitle = data.batchType;
          newChildBatch.tech = data.batchTypeDescription;
          newChildBatch.startDate = data.trainingStartDate;
          newChildBatch.endDate = data.trainingEndDate;
          newChildBatch.trainingCoordinator = parentBatch.trainingCoordinator;
          newChildBatch.headTrainer = data.trainer;
          newChildBatch.status = data.batchStatus;
          newChildBatch.parent = parentBatch;

          const createdChildBatch = await this.batchRepo.save(newChildBatch);

          newData.batchId = createdChildBatch.id;
          newData.empId = employee.empId;

          await this.trainingDetailRepository.createRecord(newData);
          await this.rawTrainingDashboardRepo.updateData(data, {
            isProcessed: true,
          });
        } else if (Object.keys(batchWithChildren).length !== 0) {
          const childBatchId = batchWithChildren.children.filter(
            (child) =>
              child.tech === data.batchType &&
              child.batchTitle === data.batchTypeDescription,
          );

          newData.batchId = childBatchId[0].id;
          newData.empId = employee.empId;

          await this.trainingDetailRepository.createRecord(newData);
          await this.rawTrainingDashboardRepo.updateData(data, {
            isProcessed: true,
          });
        }
      }
    }
  }

  convertDate(inputDateString: Date) {
    const inputDate = new Date(inputDateString);

    const year = inputDate.getUTCFullYear();
    const month = inputDate.getUTCMonth() + 1;
    const day = inputDate.getUTCDate();
    const hours = 5;
    const minutes = 30;
    const seconds = 0;

    const outputDateString = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')} ${hours}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return outputDateString;
  }

  removeGPart(inputString: string): string {
    // Use regular expression to remove G1, G2, G3, G4, G5, etc.
    const regex = /(G\d+)\s*/gi;
    const result = inputString.replace(regex, '');

    // Remove whitespace before a colon
    const updatedResult = result.replace(/\s*:/g, ':');

    return updatedResult;
  }
}
