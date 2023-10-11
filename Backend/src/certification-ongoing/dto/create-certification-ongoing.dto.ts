import { ApiProperty } from '@nestjs/swagger';
import { ApprovedCertification } from 'src/approved-certification/entities/approved-certification.entity';
import { Employee } from 'src/employee/entities/employee.entity';

export class CreateCertificationOngoingDto {
  @ApiProperty()
  empId: Employee;

  @ApiProperty()
  exam: ApprovedCertification;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  expectedEndDate: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  when: string;

  @ApiProperty()
  what: string;
}
