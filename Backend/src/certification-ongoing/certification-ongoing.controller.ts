import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CertificationOngoingService } from './certification-ongoing.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerConstant } from 'src/core/swagger.constants';
import { CertificationOngoing } from './entities/certification-ongoing.entity';
import { CreateCertificationOngoingDto } from './dto/create-certification-ongoing.dto';
import { UpdateCertificationOngoingDto } from './dto/update-certification-ongoing.dto';

@Controller('certification-ongoing')
@ApiTags('Certification Ongoing')
export class CertificationOngoingController {
  constructor(
    private certificationOngoingService: CertificationOngoingService,
  ) {}

  @ApiOperation({
    description:
      'Endpoint to create a new record for Certification Ongoing for an employee',
  })
  @ApiCreatedResponse({ description: SwaggerConstant.CreatedRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post()
  AddData(
    @Body() createCertificationOngoingDto: CreateCertificationOngoingDto,
  ): Promise<CertificationOngoing> {
    return this.certificationOngoingService.createCertificationOngoing(
      createCertificationOngoingDto,
    );
  }

  @ApiOperation({
    description: 'Endpoint to get all Certification Ongoing data',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get()
  getAll(): Promise<CertificationOngoing[]> {
    return this.certificationOngoingService.getAll();
  }

  @ApiOperation({
    description: 'Endpoint to get a Certification ongoing by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<CertificationOngoing> {
    return this.certificationOngoingService.getOne(id);
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
    @Body() updateCertificationOngoingDto: UpdateCertificationOngoingDto,
  ): Promise<CertificationOngoing> {
    return this.certificationOngoingService.updateData(
      id,
      updateCertificationOngoingDto,
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
  deleteData(@Param('id') id: string): Promise<CertificationOngoing> {
    return this.certificationOngoingService.deleteData(id);
  }
}
