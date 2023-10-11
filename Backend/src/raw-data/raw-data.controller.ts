import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponse } from 'src/core/pagination.interface';
import { SwaggerConstant } from 'src/core/swagger.constants';
import { RawBatchService } from './overall-training/raw-batch.service';
import { RawTrainingDashboardService } from './overall-training/raw-training-dashboard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { RawDataService } from './raw-data.service';
import { Job } from 'src/Job/entities/job.entity';
import { JobService } from 'src/Job/job.service';
import { RawBatch } from './overall-training/entities/raw-batch.entity';
import { RawTrainingDashboard } from './overall-training/entities/raw-training-dashboard.entity';
import { uploadFilePath } from 'src/core/file-paths.constants';
import { RawActiveEmployeeService } from './employee-master/raw-active-employee.service';
import { RawResignedEmployeeService } from './employee-master/raw-resigned-employee.service';
import {
  CertificationConstant,
  EmployeeMasterConstant,
  TrainingSheetsConstant,
} from 'src/core/sheetNames.constants';
import { RawApprovedCertificationService } from './certification/raw-approved-certification.service';
import { RawAchievedService } from './certification/raw-achieved.service';
import { RawOnGoingService } from './certification/raw-on-going.service';
import { RawApprovedCertification } from './certification/entities/raw-approved-certification.entity';
import { RawAchieved } from './certification/entities/raw-achieved.entity';
import { RawOngoing } from './certification/entities/raw-ongoing.entity';
import { RawResignedEmployee } from './employee-master/entities/raw-resigned-employee.entity';
import { RawActiveEmployee } from './employee-master/entities/raw-active-employee.entity';

@Controller('raw-data')
export class RawDataController {
  constructor(
    private batchesService: RawBatchService,
    private trainingDashService: RawTrainingDashboardService,
    private rawDataService: RawDataService,
    private importService: JobService,
    private rawActiveEmployeeService: RawActiveEmployeeService,
    private rawResignedEmployeeService: RawResignedEmployeeService,
    private rawApprovedCertificationService: RawApprovedCertificationService,
    private rawAchievedService: RawAchievedService,
    private rawOnGoingService: RawOnGoingService,
  ) {}

  @ApiTags('File upload')
  @ApiOperation({
    description: 'Endpoint to upload the Overall Dashboard file.',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiBadRequestResponse({ description: 'File not selected' })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post('/dashboard/import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTraining(@UploadedFile() file) {
    if (!file) {
      throw new HttpException(
        'Please select a file to import',
        HttpStatus.BAD_REQUEST,
      );
    }

    const now = new Date();
    const dateSuffix = now.toISOString().replace(/:/g, '-');
    const timestampedFilename = `${dateSuffix}_${file.originalname}`;

    const targetDirectory = uploadFilePath;

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    const filePath = path.join(targetDirectory, timestampedFilename);

    fs.writeFileSync(filePath, file.buffer);

    this.rawDataService.checkSheets(
      file.buffer,
      filePath,
      TrainingSheetsConstant,
    );

    const jobDetail: Job = await this.importService.createSummary(
      timestampedFilename,
      filePath,
      true,
      'Training Details',
    );

    return {
      jobId: jobDetail.jobId,
      status: jobDetail.status,
      fileName: jobDetail.fileName,
    };
  }

  @ApiTags('File upload')
  @ApiOperation({
    description: 'Endpoint to upload the Employee Master file.',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiBadRequestResponse({ description: 'File not selected' })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post('/employee-master/import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEmployeeMaster(@UploadedFile() file) {
    if (!file) {
      throw new HttpException(
        'Please select a file to import',
        HttpStatus.BAD_REQUEST,
      );
    }

    const now = new Date();
    const dateSuffix = now.toISOString().replace(/:/g, '-');
    const timestampedFilename = `${dateSuffix}_${file.originalname}`;

    const targetDirectory = uploadFilePath;

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    const filePath = path.join(targetDirectory, timestampedFilename);

    fs.writeFileSync(filePath, file.buffer);

    this.rawDataService.checkSheets(
      file.buffer,
      filePath,
      EmployeeMasterConstant,
    );

    const jobDetail: Job = await this.importService.createSummary(
      timestampedFilename,
      filePath,
      true,
      'Employee Master',
    );

    return {
      jobId: jobDetail.jobId,
      status: jobDetail.status,
      fileName: jobDetail.fileName,
    };
  }

  @ApiTags('File upload')
  @ApiOperation({
    description: 'Endpoint to upload the Certification data file.',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiBadRequestResponse({ description: 'File not selected' })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post('/certification/import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCertification(@UploadedFile() file) {
    if (!file) {
      throw new HttpException(
        'Please select a file to import',
        HttpStatus.BAD_REQUEST,
      );
    }

    const now = new Date();
    const dateSuffix = now.toISOString().replace(/:/g, '-');
    const timestampedFilename = `${dateSuffix}_${file.originalname}`;

    const targetDirectory = uploadFilePath;

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    const filePath = path.join(targetDirectory, timestampedFilename);

    fs.writeFileSync(filePath, file.buffer);

    this.rawDataService.checkSheets(
      file.buffer,
      filePath,
      CertificationConstant,
    );

    const jobDetail: Job = await this.importService.createSummary(
      timestampedFilename,
      filePath,
      true,
      'Certification',
    );

    return {
      jobId: jobDetail.jobId,
      status: jobDetail.status,
      fileName: jobDetail.fileName,
    };
  }

  @ApiTags('Raw-data')
  @Get('/batch/tech')
  getTech() {
    return this.batchesService.getTech();
  }

  @ApiTags('Raw-data')
  @ApiOperation({ description: 'Get all the data from Batches sheet' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set how many records you want to display.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'name of the column by which you want to sort',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'status',
    required: false,
  })
  @ApiQuery({
    name: 'tech',
    required: false,
  })
  @Get('/batch')
  getAll(
    @Query('page') pageNo: number,
    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('status') status: string,
    @Query('tech') tech: string,
  ): Promise<PaginatedResponse> {
    return this.batchesService.getAll(
      pageNo,
      noOfRecords,
      orderBy,
      order,
      status,
      tech,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description: 'Get all data from Training Dashboard Excel sheet',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set the no. of rows needs to be displayed.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'name of the column by which you want to sort',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name to search for',
  })
  @Get('/training-dashboard')
  getAllTrainingDashboard(
    @Query('page') pageNo: number,

    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('name') name: string,
  ): Promise<PaginatedResponse> {
    return this.trainingDashService.getAll(
      pageNo,
      noOfRecords,
      name,
      orderBy,
      order,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description:
      'Get all data from Employee Master excel files Active employee sheet',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'page',
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set the no. of rows needs to be displayed.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'name of the column by which you want to sort',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name to search for',
  })
  @Get('/active-employee')
  getAllActiveEmployee(
    @Query('page') page: number,
    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('name') name: string,
  ): Promise<PaginatedResponse> {
    return this.rawActiveEmployeeService.getAll(
      page,
      noOfRecords,
      orderBy,
      order,
      name,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description:
      'Get all data from Employee Master excel files Resigned employee sheet',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'page',
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set the no. of rows needs to be displayed.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'name of the column by which you want to sort',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name to search for',
  })
  @Get('/resigned-employee')
  getAllResignedEmployee(
    @Query('page') page: number,
    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('name') name: string,
  ): Promise<PaginatedResponse> {
    return this.rawResignedEmployeeService.getAll(
      page,
      noOfRecords,
      orderBy,
      order,
      name,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description: 'Get all the data from Approved Certification sheet',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set how many records you want to display.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Name of the column by which you want to sort.',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'certification',
    required: false,
  })
  @ApiQuery({
    name: 'level',
    required: false,
  })
  @Get('/approved-certification')
  getAllApprovedCertification(
    @Query('page') pageNo: number,
    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('certification') certificationName: string,
    @Query('level') level: string,
  ): Promise<PaginatedResponse> {
    return this.rawApprovedCertificationService.getAll(
      pageNo,
      noOfRecords,
      orderBy,
      order,
      certificationName,
      level,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description: 'Get all the data from Approved Certification sheet',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set how many records you want to display.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Name of the column by which you want to sort.',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Search for data by name',
  })
  @ApiQuery({
    name: 'certification',
    required: false,
    description: 'Search for data by certification',
  })
  @Get('/achieved')
  getAllAchieved(
    @Query('page') pageNo: number,
    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('name') name: string,
    @Query('certification') certificationName: string,
  ): Promise<PaginatedResponse> {
    return this.rawAchievedService.getAll(
      pageNo,
      noOfRecords,
      orderBy,
      order,
      name,
      certificationName,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description: 'Get all the data from Approved Certification sheet',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'noOfRecords',
    required: false,
    description: 'Set how many records you want to display.',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Name of the column by which you want to sort.',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'asc / desc',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Search for data by name',
  })
  @ApiQuery({
    name: 'certification',
    required: false,
    description: 'Search for data by certification',
  })
  @Get('/on-going')
  getAllonGoing(
    @Query('page') pageNo: number,
    @Query('noOfRecords') noOfRecords: number,
    @Query('orderBy') orderBy: string,
    @Query('order') order: string,
    @Query('name') name: string,
    @Query('certification') certificationName: string,
  ): Promise<PaginatedResponse> {
    return this.rawOnGoingService.getAll(
      pageNo,
      noOfRecords,
      orderBy,
      order,
      name,
      certificationName,
    );
  }

  @ApiTags('Raw-data')
  @ApiOperation({
    description: 'Get all values for status filter',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get('/batch/status')
  getStatusValues() {
    return this.batchesService.getStatus();
  }
}
