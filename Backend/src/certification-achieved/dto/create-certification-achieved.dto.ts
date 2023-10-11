import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApprovedCertification } from 'src/approved-certification/entities/approved-certification.entity';
import { Employee } from 'src/employee/entities/employee.entity';

export class CreateCertificationAchievedDto {
  @ApiProperty()
  @IsNotEmpty()
  empId: Employee;

  @ApiProperty()
  @IsNotEmpty()
  exam: ApprovedCertification;

  @ApiProperty()
  achievedDate: Date;

  @ApiProperty()
  expiryDate: Date;

  @ApiProperty()
  certificatiionLink: string;
}
