/*
https://docs.nestjs.com/controllers#controllers
*/

import { 
    Body, 
    ConflictException, 
    Controller, 
    DefaultValuePipe, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    InternalServerErrorException, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post, 
    Query 
} from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeEntity } from 'src/modules/entities/employee.entity';
import { EMPLOYEE_EXCEPTIONS } from '../constants/exceptions';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly service: EmployeeService) {}

    @Post('save')
    @HttpCode(HttpStatus.CREATED)
    async createEmployee(@Body() employee: CreateEmployeeDto): Promise<EmployeeEntity> {
        try {
            const newEmployee = await this.service.createEmployee(employee);
            return newEmployee;
        } catch (error) {
            if (error.code === '23505') { 
                throw new ConflictException(EMPLOYEE_EXCEPTIONS.EMPLOYEE_ALREADY_EXISTS);
            }
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Get('list')
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ): Promise<EmployeeEntity[]> {
        try {
            return this.service.findAll(page, limit);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Get('find/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Query('id') id: string): Promise<EmployeeEntity | null> {
        try {
            return this.service.findById(id);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Patch('update/:id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() employee: CreateEmployeeDto): Promise<EmployeeEntity | null> {
        try {
            return this.service.update(id, employee);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return this.service.delete(id);
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @Get('count')
    @HttpCode(HttpStatus.OK)
    async count(): Promise<number> {
        try {
            return this.service.count();
        } catch (error) {
            throw new InternalServerErrorException(HttpCode(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
