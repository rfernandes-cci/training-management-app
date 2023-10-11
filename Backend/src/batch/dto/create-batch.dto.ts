import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Batch } from '../entities/batch.entity';

export class CreateBatchDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  batchTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tech: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  trainingCoordinator: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  headTrainer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  parent?: Batch;
}
