import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TrainingDetailService } from './training-detail.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerConstant } from 'src/core/swagger.constants';
import { TrainingDetail } from './entities/training-detail.entity';
import { CreateTrainingDetailDto } from './dto/create-training-detail.dto';
import { UpdateTrainingDetailDto } from './dto/update-training-detail.dto';

@Controller('training-detail')
@ApiTags('Training Detail')
export class TrainingDetailController {
  constructor(private trainingDetailService: TrainingDetailService) {}

  @ApiOperation({ description: 'Endpoint to create a new Training detail' })
  @ApiCreatedResponse({ description: SwaggerConstant.CreatedRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post()
  createTrainingDetail(
    @Body() createTrainingDetailDto: CreateTrainingDetailDto,
  ): Promise<TrainingDetail> {
    return this.trainingDetailService.createTrainingDetail(
      createTrainingDetailDto,
    );
  }

  @ApiOperation({ description: 'Endpoint to get all Training Detail data' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @ApiQuery({
    name: 'employeeID',
    description: 'To fetch all training data for a single employee',
    required: false,
  })
  @ApiQuery({
    name: 'supervisorID',
    description:
      'To fetch all training data for all employees under the supervisor',
    required: false,
  })
  @ApiQuery({
    name: 'clientName',
    description:
      'To fetch all training data for all employees for a client team',
    required: false,
  })
  @Get()
  getAll(
    @Query('employeeID') empId: string,
    @Query('supervisorID') supId: string,
    @Query('clientName') clientName: string,
  ): Promise<TrainingDetail[]> {
    return this.trainingDetailService.getAll(empId, supId, clientName);
  }

  @ApiOperation({ description: 'Endpoint to get a Training Detail by Id' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<TrainingDetail> {
    return this.trainingDetailService.getOne(id);
  }

  @ApiOperation({
    description: 'Endpoint to update a Training Detail by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainingDetailDto: UpdateTrainingDetailDto,
  ): Promise<TrainingDetail> {
    return this.trainingDetailService.updateData(id, updateTrainingDetailDto);
  }

  @ApiOperation({
    description: 'Endpoint to delete a Training Detail by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<TrainingDetail> {
    return this.trainingDetailService.deleteData(id);
  }
}
