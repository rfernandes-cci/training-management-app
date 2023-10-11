import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { NormalizeService } from './normalize.service';

@Controller('normalize')
@ApiTags('Normalize')
export class NormalizeController {
  constructor(private normalizeService: NormalizeService) {}

  @ApiOperation({
    description:
      'Endpoint to Transfer the data from raw_active_employee & raw_resigned_employee table to normalized employee table',
  })
  @Get('/employee')
  normalizeEmployee() {
    return this.normalizeService.normalizeEmployee();
  }

  @ApiOperation({
    description:
      'Endpoint to Transfer the data from raw_batch table to normalized batch table',
  })
  @Get('/batch')
  normalizeBatch() {
    return this.normalizeService.normalizeBatch();
  }

  @ApiOperation({
    description:
      'Endpoint to Transfer the data from raw_training_dashboard table to normalized training_detail table',
  })
  @Get('/training-detail')
  normalizeTrainingDetail() {
    return this.normalizeService.normalizeTrainingDetail();
  }

  @ApiOperation({
    description:
      'Endpoint to Transfer the data from raw_approved_certification table to normalized approved_certification table',
  })
  @Get('/approved-certification')
  normalizeApprovedCertification() {
    return this.normalizeService.normalizeApprovedCertification();
  }

  @ApiOperation({
    description:
      'Endpoint to Transfer the data from raw_achieved table to normalized certification_achieved table',
  })
  @Get('/certification-achieved')
  normalizeCertificationAchieved() {
    return this.normalizeService.normalizecertificationAchieved();
  }
}
