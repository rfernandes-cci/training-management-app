import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApprovedCertificationService } from './approved-certification.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerConstant } from 'src/core/swagger.constants';
import { CreateApprovedCertificationDto } from './dto/create-approved-certification.dto';
import { ApprovedCertification } from './entities/approved-certification.entity';
import { UpdateApprovedCertificationDto } from './dto/update-approved-certification.dto';

@Controller('approved-certification')
@ApiTags('Approved Certificaton')
export class ApprovedCertificationController {
  constructor(
    private approvedCertificaionService: ApprovedCertificationService,
  ) {}

  @ApiOperation({ description: 'Endpoint to add a new Approved Certification' })
  @ApiCreatedResponse({ description: SwaggerConstant.CreatedRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post()
  AddData(
    @Body() createApprovedCertificationDto: CreateApprovedCertificationDto,
  ): Promise<ApprovedCertification> {
    return this.approvedCertificaionService.createApprovedCertification(
      createApprovedCertificationDto,
    );
  }

  @ApiOperation({ description: 'Endpoint to get all certification data' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get()
  getAll(): Promise<ApprovedCertification[]> {
    return this.approvedCertificaionService.getAll();
  }

  @ApiOperation({ description: 'Endpoint to get a certification by Id' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ApprovedCertification> {
    return this.approvedCertificaionService.getOne(id);
  }

  @ApiOperation({
    description: 'Endpoint to update a certification by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Patch(':id')
  updateData(
    @Param('id') id: string,
    @Body() updateApprovedCertificationDto: UpdateApprovedCertificationDto,
  ): Promise<ApprovedCertification> {
    return this.approvedCertificaionService.updateData(
      id,
      updateApprovedCertificationDto,
    );
  }

  @ApiOperation({
    description: 'Endpoint to delete a certification by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Delete(':id')
  deleteData(@Param('id') id: string): Promise<ApprovedCertification> {
    return this.approvedCertificaionService.deleteData(id);
  }
}
