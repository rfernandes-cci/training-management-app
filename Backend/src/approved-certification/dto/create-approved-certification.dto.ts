import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApprovedCertificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tech: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  certificationName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty()
  costInDollar: number;
}
