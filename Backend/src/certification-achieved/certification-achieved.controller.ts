import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CertificationAchievedService } from './certification-achieved.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerConstant } from 'src/core/swagger.constants';
import { CertificationAchieved } from './entities/certification-achieved.entity';
import { CreateCertificationAchievedDto } from './dto/create-certification-achieved.dto';
import { UpdateCertificationAchievedDto } from './dto/update-certification-achieved.dto';

@Controller('certification-achieved')
@ApiTags('Certification Achieved')
export class CertificationAchievedController {
  constructor(
    private certificationAchievedService: CertificationAchievedService,
  ) {}

  @ApiOperation({
    description:
      'Endpoint to create a new record for Certification achieved by an employee',
  })
  @ApiCreatedResponse({ description: SwaggerConstant.CreatedRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post()
  AddData(
    @Body() createCertificationAchieved: CreateCertificationAchievedDto,
  ): Promise<CertificationAchieved> {
    return this.certificationAchievedService.createCertificationAchieved(
      createCertificationAchieved,
    );
  }

  @ApiOperation({
    description: 'Endpoint to get all Certification achieved data',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get()
  getAll(): Promise<CertificationAchieved[]> {
    return this.certificationAchievedService.getAll();
  }

  @ApiOperation({
    description: 'Endpoint to get a Certification achieved by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<CertificationAchieved> {
    return this.certificationAchievedService.getOne(id);
  }

  @ApiOperation({
    description: 'Endpoint to update a record by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Patch(':id')
  updateData(
    @Param('id') id: string,
    @Body() updateCertificationAchievedDto: UpdateCertificationAchievedDto,
  ): Promise<CertificationAchieved> {
    return this.certificationAchievedService.updateData(
      id,
      updateCertificationAchievedDto,
    );
  }

  @ApiOperation({
    description: 'Endpoint to delete a record by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Delete(':id')
  deleteData(@Param('id') id: string): Promise<CertificationAchieved> {
    return this.certificationAchievedService.deleteData(id);
  }
}
