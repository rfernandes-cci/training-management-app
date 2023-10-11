import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateEmplyeeDto } from './dto/update-emplyee.dto';
import { SwaggerConstant } from 'src/core/swagger.constants';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @ApiOperation({ description: 'Endpoint to create a new Employee' })
  @ApiCreatedResponse({ description: SwaggerConstant.CreatedRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Post()
  createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @ApiOperation({ description: 'Endpoint to get all Employees data' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get()
  getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }

  @ApiOperation({ description: 'Endpoint to get an employee by employee Id' })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':id')
  getOneEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.getOne(id);
  }

  @ApiOperation({
    description: 'Endpoint to update an employee by employee Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Patch(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmplyeeDto,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @ApiOperation({
    description: 'Endpoint to delete an employee by employee Id',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiNotFoundResponse({ description: SwaggerConstant.NotFoundRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Delete(':id')
  deleteEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.deleteEmployee(id);
  }

  @ApiOperation({
    description: 'Endpoint to fetch all training data for a single employee',
  })
  @ApiOkResponse({ description: SwaggerConstant.OkRes })
  @ApiInternalServerErrorResponse({
    description: SwaggerConstant.InternalServerErrorRes,
  })
  @Get(':empId/training-details')
  getTrainingDetailsForEmployee(
    @Param('empId') empId: string,
  ): Promise<Employee> {
    return this.employeeService.getTrainingDetailsForEmployee(empId);
  }
}
