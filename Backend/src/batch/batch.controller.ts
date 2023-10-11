import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BatchService } from './batch.service';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerConstant } from 'src/core/swagger.constants';
import { CreateBatchDto } from './dto/create-batch.dto';
import { Batch } from './entities/batch.entity';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Controller('batch')
@ApiTags('Batch')
export class BatchController {
  constructor(private batchService: BatchService) {}

  @ApiOperation({ description: 'Endpoint to create a new Batch' })
  @ApiCreatedResponse({ description: SwaggerConstant.CreatedRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post()
  createBatch(@Body() createBatchDto: CreateBatchDto): Promise<Batch> {
    return this.batchService.createBatch(createBatchDto);
  }

  @ApiOperation({ description: 'Endpoint to get all Batches data' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get()
  getAll(): Promise<Batch[]> {
    return this.batchService.getAll();
  }

  @ApiOperation({ description: 'Endpoint to get a Batch by Id' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Batch> {
    return this.batchService.getOne(id);
  }

  @ApiOperation({
    description: 'Endpoint to update a Batch by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBatchDto: UpdateBatchDto,
  ): Promise<Batch> {
    return this.batchService.updateData(id, updateBatchDto);
  }

  @ApiOperation({
    description: 'Endpoint to delete a batch by Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Batch> {
    return this.batchService.deleteData(id);
  }
}
