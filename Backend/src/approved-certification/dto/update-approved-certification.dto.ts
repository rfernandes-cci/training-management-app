import { PartialType } from '@nestjs/swagger';
import { CreateApprovedCertificationDto } from './create-approved-certification.dto';

export class UpdateApprovedCertificationDto extends PartialType(
  CreateApprovedCertificationDto,
) {}
