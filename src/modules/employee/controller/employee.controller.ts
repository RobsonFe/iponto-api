/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeEntity } from 'src/modules/entities/employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly service: EmployeeService) {}

    @Post('save')
    async createEmployee(@Body() employee: CreateEmployeeDto): Promise<EmployeeEntity> {
        return this.service.createEmployee(employee);
    }

    @Get('list')
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ): Promise<EmployeeEntity[]> {
        return this.service.findAll(page, limit);
    }

    @Get('find/:id')
    async findById(@Query('id') id: string): Promise<EmployeeEntity | null> {
        return this.service.findById(id);
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() employee: CreateEmployeeDto): Promise<EmployeeEntity | null> {
        return this.service.update(id, employee);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.service.delete(id);
    }

    @Get('count')
    async count(): Promise<number> {
        return this.service.count();
    }
}
