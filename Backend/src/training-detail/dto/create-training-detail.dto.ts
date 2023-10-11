import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Batch } from 'src/batch/entities/batch.entity';
import { Employee } from 'src/employee/entities/employee.entity';

export class CreateTrainingDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  empId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  batchId: string;
}
